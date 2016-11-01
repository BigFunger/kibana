import _ from 'lodash';
import ProcessorCollection from 'ui/pipelines/processor_collection/processor_collection';
import { SampleCollection } from 'ui/pipelines/sample_collection/sample_collection';
import processorCollectionTypes from 'ui/pipelines/constants/processor_collection_types';

export default class Pipeline {
  constructor(processorRegistry, model) {
    const defaultModel = {
      pipelineId: '',
      description: ''
    };

    _.defaults(
      this,
      _.pick(model, _.keys(defaultModel)),
      defaultModel
    );

    this.processorCollection = new ProcessorCollection(
      this,
      'Main Pipeline',
      _.get(model, 'processors'),
      processorCollectionTypes.MAIN
    );

    this.failureProcessorCollection = new ProcessorCollection(
      this,
      'Global Failure',
      _.get(model, 'failureProcessors'),
      processorCollectionTypes.GLOBAL_FAILURE
    );

    this.sampleCollection = new SampleCollection({
      samples: _.get(model, 'samples'),
      index: _.get(model, 'sampleIndex')
    });

    this.processorRegistry = processorRegistry;
    this.processorCollections = [];
    this.activeProcessorCollection = this.processorCollection;
    this.output = undefined;
    this.dirty = false;
    this.hasCompileError = false;
    this.globalFailureProcessorIds = [];
    this.processorCounters = {};

    this.failureOptions = {
      index_fail: 'Do not index document',
      on_error: 'Execute other processors'
    };
  }

  get model() {
    const result = {
      pipelineId: this.pipelineId,
      description: this.description,
      failureProcessors: this.failureProcessorCollection.model,
      processors: this.processorCollection.model,
      samples: this.sampleCollection.model,
      sampleIndex: this.sampleCollection.index
    };

    return result;
  }

  getNewProcessorId(typeId) {
    typeId = typeId || 'new_processor';
    const counter = (_.get(this.processorCounters, typeId) || 0) + 1;
    _.set(this.processorCounters, typeId, counter);

    return `${typeId}_${counter}`;
  }

  setDirty() {
    this.dirty = true;
  }

  updateOutput(allProcessors, simulateResults) {
    allProcessors = allProcessors || {};

    if (_.isEmpty(this.processorCollection.processors)) {
      this.output = { doc: this.sampleCollection.getCurrentSample().doc, meta: {} };
      this.error = false;
    } else {
      const lastResult = _.last(simulateResults);
      const lastProcessor = allProcessors[_.get(lastResult, 'processorId')];

      this.output = _.get(lastProcessor, 'outputObject');
      this.error = _.get(lastProcessor, 'causeIndexFail');
    }

    this.dirty = false;
  }

  // Updates the state of the pipeline and processors with the results
  // from an ingest simulate call.
  applySimulateResults(simulateResults) {
    this.sampleCollection.applySimulateResults(simulateResults);

    const currentSampleResults = simulateResults[this.sampleCollection.index];
    const allProcessors = this.allProcessors;
    const allResults = {};

    _.forEach(currentSampleResults, result => {
      allResults[result.processorId] = result;
    });

    _.forEach(allProcessors, (processorShell) => {
      processorShell.setSimulateResult(allResults[processorShell.processorId]);
    });

    this.processorCollection.applySimulateResults({ doc: this.sampleCollection.getCurrentSample().doc, meta: {} });

    const failureProcessorId = _.get(this.failureProcessorCollection, 'processors[0].failureProcessorId');
    const failureProcessor = allProcessors[failureProcessorId];
    const failureSourceInput = failureProcessor ? failureProcessor.inputObject : undefined;
    this.failureProcessorCollection.applySimulateResults(failureSourceInput);

    this.updateOutput(allProcessors, currentSampleResults);
  }

  get allProcessors() {
    return _.assign(
      {},
      this.processorCollection.allProcessors,
      this.failureProcessorCollection.allProcessors
    );
  }


  get allProcessorCollections() {
    return [].concat(
      this.processorCollection.allProcessorCollections,
      this.failureProcessorCollection.allProcessorCollections);
  }
}

function getObjectMeta(lastResult) {
  if (!_.has(lastResult, 'ingestMeta')) {
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
