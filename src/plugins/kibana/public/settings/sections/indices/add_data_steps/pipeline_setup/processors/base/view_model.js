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

    this.state = 'not initialized';

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

    if (this.outputObject && !this.error) {
      this.state = 'valid';
    } else if (!this.outputObject && !this.error) {
      this.state = 'no result';
    } else if (this.error && this.ignoreFailure === 'ignore_error') {
      this.state = 'error recover';
    } else if (this.error && this.ignoreFailure === 'on_error' &&
        this.errorProcessorCollection.processors.length > 0) {
      this.state = 'error recover';
    } else if (this.error && this.error.compile) {
      this.state = 'error compile';
    } else {
      this.state = 'error fail';
    }
  }

  get model() {
    return {
      processorId: this.processorId,
      typeId: this.typeId,
      ignoreFailure: this.ignoreFailure,
      processors: _.map(this.errorProcessorCollection.processors, processor => processor.model)
    };
  }

  get output() {
    return this.outputObject ? this.outputObject : this.errorProcessorCollection.output;
  }
}
