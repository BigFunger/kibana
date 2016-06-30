import _ from 'lodash';
import ProcessorCollection from './processor_collection';

export default class Pipeline {

  constructor(model) {
    const defaultModel = {
      pipelineId: '',
      description: '',
      failureAction: 'index_fail'
    };

    _.defaults(
      this,
      _.pick(model, _.keys(defaultModel)),
      defaultModel
    );

    this.processorCollection = new ProcessorCollection('Main Pipeline', _.get(model, 'processors'));
    this.errorProcessorCollection = new ProcessorCollection('General Failure', _.get(model, 'errorProcessors'));


    this.processorCollections = [];
    this.activeProcessorCollection = this.processorCollection;
    this.input = {};
    this.output = undefined;
    this.dirty = false;
    this.hasCompileError = false;
  }

  get model() {
    return {
      pipelineId: this.pipelineId,
      description: this.description,
      failureAction: this.failureAction,
      errorProcessors: _.map(this.errorProcessorCollection.processors, processor => processor.model),
      processors: _.map(this.processorCollection.processors, processor => processor.model)
    };
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

  jumpToProcessorCollection(index) {
    while (this.processorCollections.length > index) {
      this.activeProcessorCollection = this.processorCollections.pop();
    }
  }

  updateOutput(simulateResults) {
    const lastResult = _.last(simulateResults);
    const output = _.get(lastResult, 'output');
    const error = _.get(lastResult, 'error');

    this.output = output;
    this.error = !!error;

    this.dirty = false;
  }

  // Updates the state of the pipeline and processors with the results
  // from an ingest simulate call.
  applySimulateResults(simulateResults) {
    updateProcessorOutputs(this, simulateResults);
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
