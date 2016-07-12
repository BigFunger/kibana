import _ from 'lodash';
import * as ProcessorViewModels from '../processors/view_models';

export default class ProcessorCollection {

  constructor(title, processors, type, parentProcessor) {
    this.title = title;
    this.type = type;
    this.valueField;
    this.processors = [];
    this.input = {};
    this.parentProcessor = parentProcessor;

    this.ProcessorTypes = {};
    _.forIn(ProcessorViewModels, (ViewModel) => {
      this.ProcessorTypes[ViewModel.id] = ViewModel;
    });

    const collection = this;
    _.forEach(processors, (processorModel) => {
      collection.add(null, processorModel);
    });
    this.updateParents();
  }

  add(typeId, processorModel) {
    typeId = _.get(processorModel, 'typeId') || typeId;
    const ProcessorType = this.ProcessorTypes[typeId];
    const processorCounter = ProcessorCollection.processorCounter += 1;
    const processorId = `processor_${processorCounter}`;
    const newProcessor = new ProcessorType(processorId, processorModel);

    if (processorModel) {
      newProcessor.new = false;
      newProcessor.collapsed = true;
    }

    this.processors.push(newProcessor);

    return newProcessor;
  }

  remove(processor) {
    const processors = this.processors;
    const index = processors.indexOf(processor);

    processors.splice(index, 1);
  }

  moveUp(processor) {
    const processors = this.processors;
    const index = processors.indexOf(processor);

    if (index === 0) return;

    const temp = processors[index - 1];
    processors[index - 1] = processors[index];
    processors[index] = temp;
  }

  moveDown(processor) {
    const processors = this.processors;
    const index = processors.indexOf(processor);

    if (index === processors.length - 1) return;

    const temp = processors[index + 1];
    processors[index + 1] = processors[index];
    processors[index] = temp;
  }

  updateParents() {
    this.processors.forEach((processor, index) => {
      const newParent = index > 0 ? this.processors[index - 1] : null;
      processor.setParent(newParent);
    });
  }

  updateInputs(rootInput) {
    if (rootInput) {
      this.input = rootInput;

      if (this.valueField) {
        this.input = _.set({}, this.valueField, _.get(this.input, this.valueField));
      }
    }

    this.processors.forEach((processor, index) => {
      if (index === 0) {
        processor.setInput(this.input);
      } else {
        processor.setInput(processor.parent.output);
      }
    });
  }

  get output() {
    const lastValidProcessor = _.findLast(this.processors, (processor) => !!processor.output);
    return lastValidProcessor ? lastValidProcessor.output : undefined;
  }

}

//static processor counter across all collections
ProcessorCollection.processorCounter = 0;

ProcessorCollection.types = {
  MAIN: 'main processors',
  PROCESSOR_FAILURE: 'processor failure branch',
  GLOBAL_FAILURE: 'global failure branch',
  FOREACH: 'foreach branch'
};
