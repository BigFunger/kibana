import _ from 'lodash';
import keysDeep from 'ui/pipelines/lib/keys_deep';
import ProcessorCollection from 'ui/pipelines/processor_collection/view_model';

export default class Processor {
  constructor() {
    this.parent = undefined;
    this.typeId = undefined;
  }

  setParent(newParent) {
    const oldParent = this.parent;
    this.parent = newParent;

    return (oldParent !== this.parent);
  }

/*
  setInput(input) {
    const metaFields = [];

    this.inputObject = _.cloneDeep(input);
    this.suggestedFields = _.union(keysDeep(_.get(this.inputObject, 'doc')), metaFields);
  }

  updateOutput() {
    if (this.new) return;

    const output = _.get(this.simulateResult, 'output');
    const meta = _.get(this.simulateResult, 'ingestMeta');
    const error = _.get(this.simulateResult, 'error');

    let newOutputObject = undefined;
    if (output) {
      newOutputObject = {
        'doc': output,
        'meta': meta
      };
    }
    this.outputObject = newOutputObject;
    this.error = error;
  }

  updateState() {
    const output = this.output;

    if (output && !this.error) {
      this.state = Processor.states.VALID;
    } else if (!output && !this.error) {
      this.state = Processor.states.NO_RESULT;
    } else if (!output && this.error && this.error.compile) {
      this.state = Processor.states.ERROR_COMPILE;
    } else if (!output && this.error) {
      this.state = Processor.states.ERROR_FAIL;
    } else if (output && this.error) {
      this.state = Processor.states.ERROR_RECOVER;
    }
  }

  get causeIndexFail() {
    return (this.state !== Processor.states.VALID && this.state !== Processor.states.ERROR_RECOVER);
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
    this.updateOutput();

    if (this.parent) {
      this.setInput(this.parent.output);
    } else {
      this.setInput(rootInput);
    }

    this.failureProcessorCollection.applySimulateResults(this.inputObject);

    this.updateState();
  }

  get failureProcessorId() {
    return _.get(this.simulateResult, 'ingestMeta._ingest.on_failure_processor_tag');
  }
  */
}

Processor.states = {
  VALID: 'valid',
  NO_RESULT: 'no result',
  ERROR_FAIL: 'error fail',
  ERROR_COMPILE: 'error compile',
  ERROR_RECOVER: 'error with recovery'
};
