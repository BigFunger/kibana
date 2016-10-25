import _ from 'lodash';
import keysDeep from 'ui/pipelines/lib/keys_deep';
import ProcessorCollection from 'ui/pipelines/processor_collection/view_model';
import processorStates from 'ui/pipelines/constants/processor_states';
import processorCollectionTypes from 'ui/pipelines/constants/processor_collection_types';

export default class ProcessorShell {

  constructor(processorRegistry, model) {
    ProcessorShell.counter += 1;
    const processorId = `processor_${ProcessorShell.counter}`;

    this.processorRegistry = processorRegistry;
    this.processorId = processorId;
    this.processor = undefined;
    this.typeId = undefined;
    this.collapsed = false;
    this.parent = undefined;
    this.inputObject = undefined;
    this.outputObject = undefined;
    this.state = processorStates.NOT_INITIALIZED;
    this.failureAction = 'index_fail';
    this.processorTypes = processorRegistry.byId;
    this.inputControlsState = { enableShowChanges: false };
    this.outputControlsState = { };

    this.failureProcessorCollection = new ProcessorCollection(
      processorRegistry,
      'Processor Failure Branch',
      _.get(model, 'failureProcessors'),
      processorCollectionTypes.PROCESSOR_FAILURE,
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

  setInput(input) {
    const metaFields = [];

    this.inputObject = _.cloneDeep(input);
    this.suggestedFields = keysDeep(_.get(this.inputObject, 'doc'));
  }

  setTypeId(typeId) {
    this.typeId = typeId;
    const ProcessorType = this.processorTypes[typeId].ViewModel;

    this.processor = new ProcessorType(
      this.processorId,
      _.get(this.processor, 'model'));

    //TODO: Move this into the constructor chain
    //ALSO, find out if this circular reference is a GC problem.
    this.processor.processorShell = this;

    //update the processorId if it has not been manually changed by the user?
  }

  get allProcessors() {
    const result = _.assign({},
      _.set({}, this.processorId, this),
      this.failureProcessorCollection.allProcessors);

    return result;
  }

  setSimulateResult(simulateResult) {
    this.simulateResult = simulateResult;
  }

  applySimulateResults(rootInput) {
    this.failureProcessorCollection.applySimulateResults(this.inputObject);
    this.updateOutput();

    if (this.parent) {
      this.setInput(this.parent.outputObject);
    } else {
      this.setInput(rootInput);
    }

    this.updateState();
  }

  updateOutput() {
    const output = _.get(this.simulateResult, 'output');
    const meta = _.get(this.simulateResult, 'ingestMeta');
    const error = _.get(this.simulateResult, 'error');

    let newOutputObject = undefined;
    if (output) {
      newOutputObject = {
        'doc': output,
        'meta': meta
      };
    } else {
      newOutputObject = this.failureProcessorCollection.output;
    }
    this.outputObject = newOutputObject;

    this.error = error;

    if (this.inputObject && this.outputObject) {
      if (!_.isEqual(this.inputObject.meta, this.outputObject.meta)) {
        this.inputControlsState.showMeta = true;
        this.outputControlsState.showMeta = true;
      }
      if (!_.isEqual(this.inputObject.doc, this.outputObject.doc)) {
        this.inputControlsState.showMeta = false;
        this.outputControlsState.showMeta = false;
      }
    }
  }

  updateState() {
    const outputObject = this.outputObject;

    if (outputObject && !this.error) {
      this.state = processorStates.VALID;
    } else if (!outputObject && !this.error) {
      this.state = processorStates.NO_RESULT;
    } else if (!outputObject && this.error && this.error.compile) {
      this.state = processorStates.ERROR_COMPILE;
    } else if (!outputObject && this.error) {
      this.state = processorStates.ERROR_FAIL;
    } else if (outputObject && this.error) {
      this.state = processorStates.ERROR_RECOVER;
    }
  }

  get model() {
    const result = _.assign(
      {},
      _.get(this.processor, 'model'),
      _.pick(this, ['processorId', 'typeId', 'failureAction', 'failureProcessors']));

    return result;
  }

}

ProcessorShell.counter = 0;
