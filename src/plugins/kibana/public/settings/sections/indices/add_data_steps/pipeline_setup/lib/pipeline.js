import _ from 'lodash';
import ProcessorCollection from './processor_collection';

export default class Pipeline {

  constructor() {
    this.processorCollection = new ProcessorCollection();
    this.input = {};
    this.output = undefined;
    this.dirty = false;
    this.hasCompileError = false;
  }

  get model() {
    const pipeline = {
      input: this.input,
      processors: _.map(this.processorCollection.processors, processor => processor.model)
    };
    return pipeline;
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

  updateOutput() {
    const processors = _.reject(this.processors, { new: true });

    const errorIndex = _.findIndex(processors, 'error');
    const goodProcessor = errorIndex === -1 ? _.last(processors) : processors[errorIndex - 1];
    this.output = goodProcessor ? goodProcessor.outputObject : this.input;

    this.dirty = false;
  }

  // Updates the state of the pipeline and processors with the results
  // from an ingest simulate call.
  applySimulateResults(simulateResults) {
    updateProcessorOutputs(this, simulateResults);
    updateErrorState(this);
    this.processorCollection.updateInputs();
    this.updateOutput();
  }

}

function updateProcessorOutputs(pipeline, simulateResults) {
  simulateResults.forEach((result) => {
    const processor = pipeline.processorCollection.getProcessorById(result.processorId);

    if (!processor.new) {
      processor.outputObject = _.get(result, 'output');
      processor.error = _.get(result, 'error');
    }
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
