import _ from 'lodash';
import ProcessorCollection from '../../lib/processor_collection';

export default class Processor {
  constructor(processorId, typeId, title, helpText) {
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

    this.errorProcessorCollection = new ProcessorCollection();
  }

  setParent(newParent) {
    const oldParent = this.parent;
    this.parent = newParent;

    return (oldParent !== this.parent);
  }

  setInput(newInputObject) {
    this.inputObject = _.cloneDeep(newInputObject);
    this.errorProcessorCollection.input = this.inputObject;
    this.errorProcessorCollection.updateInputs();
  }

  setOutput(output, error) {
    if (this.new) return;

    this.outputObject = output;
    this.error = error;
  }

  get model() {
    return {
      processorId: this.processorId,
      typeId: this.typeId,
      ignoreFailure: this.ignoreFailure,
      processors: _.map(this.errorProcessorCollection.processors, processor => processor.model)
    };
  }
}
