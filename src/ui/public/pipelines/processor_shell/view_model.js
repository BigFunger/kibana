import _ from 'lodash';
import keysDeep from 'ui/pipelines/lib/keys_deep';
import ProcessorCollection from 'ui/pipelines/processor_collection/view_model';

export default class ProcessorShell {

  constructor(processorRegistry, model) {
    ProcessorShell.counter += 1;
    const processorId = `processor_${ProcessorShell.counter}`;

    this.processorRegistry = processorRegistry;
    this.processorId = processorId;
    this.processor = undefined;
    this.typeId = undefined;
    this.processor = undefined;
    this.collapsed = false;
    this.parent = undefined;
    this.inputObject = undefined;
    this.failureAction = 'index_fail';
    this.processorTypes = processorRegistry.byId;
    this.inputControlsState = { enableShowChanges: false };
    this.outputControlsState = { };
  }

  setParent(newParent) {
    const oldParent = this.parent;
    this.parent = newParent;

    return (oldParent !== this.parent);
  }

  setInput(input) {
    const metaFields = [];

    this.inputObject = _.cloneDeep(input);
    //this.suggestedFields = keysDeep(_.get(this.inputObject, 'doc'));
  }

  setTypeId(typeId) {
    this.typeId = typeId;
    const ProcessorType = this.processorTypes[typeId].ViewModel;

    this.processor = new ProcessorType(
      this.processorRegistry,
      this.processorId,
      _.get(this.processor, 'model'));

    //update the processorId if it has not been manually changed by the user?
  }

  get allProcessors() {
    const result = _.set({}, this.processorId, this);
    if (this.processor) {
      _.assign(result, this.processor.allProcessors);
    }

    return result;
  }

}

ProcessorShell.counter = 0;
