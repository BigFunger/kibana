import _ from 'lodash';
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

  setInput(newInputObject) {
    this.inputObject = _.cloneDeep(newInputObject);
    this.failureProcessorCollection.updateInputs(this.inputObject);
  }

  setOutput(output, error) {
    if (this.new) return;

    this.outputObject = output;
    this.error = error;

    if (this.outputObject && !this.error) {
      this.state = 'valid';
    } else if (!this.outputObject && !this.error) {
      this.state = 'no result';
    } else if (this.error && this.failureAction === 'ignore_error') {
      this.state = 'error recover';
    } else if (this.error && this.failureAction === 'on_error' &&
        this.failureProcessorCollection.processors.length > 0) {
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
      failureAction: this.failureAction,
      failureProcessors: _.map(this.failureProcessorCollection.processors, processor => processor.model)
    };
  }

  get output() {
    return this.outputObject ? this.outputObject : this.failureProcessorCollection.output;
  }
}
