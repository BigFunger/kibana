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
    this.globalFailureProcessorIds = [];


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

    this.outputMeta = getObjectMeta(lastResult);

    this.dirty = false;
  }

  // Updates the state of the pipeline and processors with the results
  // from an ingest simulate call.
  applySimulateResults(simulateResults) {
    const allProcessors = this.allProcessors;
    const allResults = {};

    _.forEach(simulateResults, result => {
      allResults[result.processorId] = result;
    });

    _.forEach(allProcessors, (processor) => {
      processor.setSimulateResult(allResults[processor.processorId]);
    });

    this.processorCollection.applySimulateResults(this.input);


    //TODO: Refactor some of this into the processorCollection class?
    //Not sure how much of this is needed, now that we don't recover from a global failure.
    const failureProcessorId = _.get(this.failureProcessorCollection, 'processors[0].failureProcessorId');
    const failureProcessor = allProcessors[failureProcessorId];
    const failureSourceInput = failureProcessor ? failureProcessor.inputObject : undefined;
    this.failureProcessorCollection.applySimulateResults(failureSourceInput);
    if (failureProcessor) {
      failureProcessor.setOutput(this.failureProcessorCollection.output, failureProcessor.error);
    }

    this.updateOutput(simulateResults);
  }

  get allProcessors() {
    return _.assign(
      this.processorCollection.allProcessors,
      this.failureProcessorCollection.allProcessors);
  }
}

function getObjectMeta(lastResult) {
  if (!lastResult.ingestMeta) {
    return undefined;
  }

  const defaultMeta = {
    '_index': '_index',
    '_id': '_id',
    '_type': '_type'
  };

  const result = {};
  _.forIn(lastResult.ingestMeta, (value, key) => {
    if (defaultMeta[key] !== value) {
      _.set(result, key, value);
    }
  });

  return result;
}
