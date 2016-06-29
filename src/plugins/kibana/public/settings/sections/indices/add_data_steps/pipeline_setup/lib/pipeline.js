import _ from 'lodash';
import ProcessorCollection from './processor_collection';

export default class Pipeline {

  constructor() {
    // this.pipelineId = 'foobar';
    // this.processorCollection = new ProcessorCollection();
    // this.errorProcessorCollection = new ProcessorCollection();
    // this.processorCollections = [];
    // this.activeProcessorCollection = this.processorCollection;
    this.input = {};
    this.output = undefined;
    this.dirty = false;
    this.hasCompileError = false;
    //this.ignoreFailure = 'index_fail';
    //this.description = '';

    this.model = {};
  }

  get model() {
    return {
      pipelineId: this.pipelineId,
      description: this.description,
      ignoreFailure: this.ignoreFailure,
      errorProcessors: _.map(this.errorProcessorCollection.processors, processor => processor.model),
      processors: _.map(this.processorCollection.processors, processor => processor.model)
    };
  }

  set model(newModel) {
    this.pipelineId = newModel.pipelineId || 'foobar';
    this.description = newModel.description || '';
    this.ignoreFailure = newModel.ignoreFailure || 'index_fail';

    this.processorCollection = new ProcessorCollection(newModel.processors);
    this.errorProcessorCollection = new ProcessorCollection(newModel.errorProcessors);
    this.processorCollections = [];
    this.activeProcessorCollection = this.processorCollection;
  }

  setDirty() {
    this.dirty = true;
  }

  load(pipeline) {
    this.processorCollection = new ProcessorCollection();
    pipeline.processors.forEach((processor) => {
      this.processorCollection.addExisting(processor);
    });
  }

  ///TODO: Rename this function
  pushProcessorCollection(processorCollection) {
    if (this.activeProcessorCollection === processorCollection) return;

    this.processorCollections.push(this.activeProcessorCollection);
    this.activeProcessorCollection = processorCollection;
  }

  popProcessorCollection() {
    this.activeProcessorCollection = this.processorCollections.pop();
  }

  updateOutput(simulateResults) {
    const lastResult = _.last(simulateResults);
    const output = _.get(lastResult, 'output');
    const error = _.get(lastResult, 'error');

    this.output = output;
    this.error = !!error;

    // const processors = _.reject(this.processors, { new: true });

    // const errorIndex = _.findIndex(processors, 'error');
    // const goodProcessor = errorIndex === -1 ? _.last(processors) : processors[errorIndex - 1];
    // this.output = goodProcessor ? goodProcessor.outputObject : this.input;

    this.dirty = false;
  }

  // Updates the state of the pipeline and processors with the results
  // from an ingest simulate call.
  applySimulateResults(simulateResults) {
    updateProcessorOutputs(this, simulateResults);
    updateErrorState(this);
    this.processorCollection.updateInputs();
    this.updateOutput(simulateResults);
  }

  //Returns a flattened object containing one property per processor
  //regardless of where in the hierarchy it exists.
  getAllProcessors() {
    const result = {};

    function iteration(processorCollection) {
      _.forEach(processorCollection.processors, processor => {
        iteration(processor.errorProcessorCollection);
        result[processor.processorId] = processor;
      });
    }

    iteration(this.processorCollection);

    return result;
  }
}

function updateProcessorOutputs(pipeline, simulateResults) {
  const allProcessors = pipeline.getAllProcessors();
  const allResults = {};
  _.forEach(simulateResults, result => {
    allResults[result.processorId] = result;
  });

  _.forEach(allProcessors, (processor) => {
    const result = allResults[processor.processorId];

    const output = _.get(result, 'output');
    const error = _.get(result, 'error');

    processor.setOutput(output, error);
  });
}

//Updates the error state of the pipeline and its processors
//If a pipeline compile error is returned, lock all processors but the error
//If a pipeline data error is returned, lock all processors after the error
function updateErrorState(pipeline) {
  // pipeline.hasCompileError = _.some(pipeline.processors, (processor) => {
  //   return _.get(processor, 'error.compile');
  // });
  // _.forEach(pipeline.processors, processor => {
  //   processor.locked = false;
  // });

  // const errorIndex = _.findIndex(pipeline.processors, 'error');
  // if (errorIndex === -1) return;

  // _.forEach(pipeline.processors, (processor, index) => {
  //   if (pipeline.hasCompileError && index !== errorIndex) {
  //     processor.locked = true;
  //   }
  //   if (!pipeline.hasCompileError && index > errorIndex) {
  //     processor.locked = true;
  //   }
  // });
}
