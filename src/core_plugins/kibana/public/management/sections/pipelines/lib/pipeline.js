import _ from 'lodash';
import ProcessorCollection from './processor_collection';

export default class Pipeline {

  constructor(model) {
    ProcessorCollection.resetIdCounters();

    const defaultModel = {
      pipelineId: '',
      description: '',
      failureAction: 'index_fail',
      rawSamples: ''
    };

    _.defaults(
      this,
      _.pick(model, _.keys(defaultModel)),
      defaultModel
    );

    this.processorCollection = new ProcessorCollection(
      'Main Pipeline',
      _.get(model, 'processors'),
      ProcessorCollection.types.MAIN
    );
    this.failureProcessorCollection = new ProcessorCollection(
      'Global Failure',
      _.get(model, 'failureProcessors'),
      ProcessorCollection.types.GLOBAL_FAILURE
    );

    this.processorCollections = [];
    this.activeProcessorCollection = this.processorCollection;
    this.input = {};
    this.output = undefined;
    this.dirty = false;
    this.hasCompileError = false;

    this.failureOptions = {
      index_fail: 'Do not index document',
      on_error: 'Execute other processors'
    };
  }

  get model() {
    const result = {
      pipelineId: this.pipelineId,
      description: this.description,
      failureAction: this.failureAction,
      failureProcessors: this.failureProcessorCollection.model,
      processors: this.processorCollection.model,
      rawSamples: this.rawSamples
    };

    return result;
  }

  setDirty() {
    this.dirty = true;
  }

  ///TODO: Rename this function
  pushProcessorCollection(processorCollection) {
    if (this.activeProcessorCollection === processorCollection) return;

    this.processorCollections.push(this.activeProcessorCollection);
    this.activeProcessorCollection = processorCollection;
  }

  ///TODO: Rename this function
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
    this.error = lastResult && !output;

    this.dirty = false;
  }

  // Updates the state of the pipeline and processors with the results
  // from an ingest simulate call.
  applySimulateResults(simulateResults) {
    updateProcessorOutputs(this, simulateResults);
    this.processorCollection.updateInputs();
    this.updateOutput(simulateResults);
  }

  get allProcessors() {
    return _.assign(
      this.processorCollection.allProcessors,
      this.failureProcessorCollection.allProcessors);
  }
}

function updateProcessorOutputs(pipeline, simulateResults) {
  const allProcessors = pipeline.allProcessors;
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
