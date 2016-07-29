import _ from 'lodash';
import keysDeep from '../../lib/keys_deep';
import ProcessorCollection from '../../lib/processor_collection';

export default class Processor {
  constructor(processorId, typeId, title, helpText, mainField, defaultModel, model) {
    if (!typeId || !title) {
      throw new Error('Cannot instantiate the base Processor class.');
    }

    this.processorId = processorId;
    this.title = title;
    this.typeId = typeId;
    this.helpText = helpText;
    this.collapsed = false;
    this.parent = undefined;
    this.inputObject = undefined;
    this.outputObject = undefined;
    this.error = undefined;
    this.new = true;
    this.state = 'not initialized';
    this.mainField = mainField;

    defaultModel.failureAction = 'index_fail';

    _.defaults(
      this,
      _.pick(model, _.keys(defaultModel)),
      defaultModel
    );

    this.failureProcessorCollection = new ProcessorCollection(
      title,
      _.get(model, 'failureProcessors'),
      ProcessorCollection.types.PROCESSOR_FAILURE,
      this
    );

    this.failureOptions = {
      ignore_error: 'Ignore, and index document',
      index_fail: 'Do not index document',
      on_error: 'Execute other processors'
    };
  }

  setParent(newParent) {
    const oldParent = this.parent;
    this.parent = newParent;

    return (oldParent !== this.parent);
  }

  setOutput(output, error) {
    if (this.new) return;

    this.outputObject = output;
    this.error = error;

    this.updateState();
  }

  setInput(input) {
    const metaFields = [
      '_ingest._index',
      '_ingest._type',
      '_ingest._id',
      '_ingest._routing',
      '_ingest._parent',
      '_ingest._timestamp',
      '_ingest._ttl'
    ];

    this.inputObject = _.cloneDeep(input);
    this.suggestedFields = _.union(keysDeep(this.inputObject), metaFields);
  }

  updateState() {
    if (this.output && !this.error) {
      this.state = Processor.states.VALID;
    } else if (!this.output && !this.error) {
      this.state = Processor.states.NO_RESULT;
    } else if (!this.output && this.error && this.error.compile) {
      this.state = Processor.states.ERROR_COMPILE;
    } else if (!this.output && this.error) {
      this.state = Processor.states.ERROR_FAIL;
    } else if (this.output && this.error) {
      this.state = Processor.states.ERROR_RECOVER;
    }
  }

  get model() {
    return {
      processorId: this.processorId,
      typeId: this.typeId,
      failureAction: this.failureAction,
      failureProcessors: this.failureProcessorCollection.model
    };
  }

  get output() {
    return this.outputObject ? this.outputObject : this.failureProcessorCollection.output;
  }

  get allProcessors() {
    return _.assign(
      _.set({}, this.processorId, this),
      this.failureProcessorCollection.allProcessors);
  }

  setSimulateResult(simulateResult) {
    this.simulateResult = simulateResult;
  }

  applySimulateResults(rootInput) {
    this.failureProcessorCollection.applySimulateResults(this.inputObject);

    const output = _.get(this.simulateResult, 'output');
    const error = _.get(this.simulateResult, 'error');

    this.setOutput(output, error);

    if (this.parent) {
      this.setInput(this.parent.output);
    } else {
      this.setInput(rootInput);
    }
  }

  get failureProcessorId() {
    return _.get(this.simulateResult, 'ingestMeta.on_failure_processor_tag');
  }
}

Processor.states = {
  VALID: 'valid',
  NO_RESULT: 'no result',
  ERROR_FAIL: 'error fail',
  ERROR_COMPILE: 'error compile',
  ERROR_RECOVER: 'error with recovery'
};
