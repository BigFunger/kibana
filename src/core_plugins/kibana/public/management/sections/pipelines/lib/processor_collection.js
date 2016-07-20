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

    const processorId = _.get(processorModel, 'processorId') || ProcessorCollection.generateId(typeId);
    ProcessorCollection.useId(processorId);

    const ProcessorType = this.ProcessorTypes[typeId];
    const newProcessor = new ProcessorType(processorId, processorModel);

    if (processorModel) {
      newProcessor.new = false;
      newProcessor.collapsed = true;
    } else {
      if (this.type === ProcessorCollection.types.FOREACH) {
        if (newProcessor.mainField) {
          _.set(newProcessor, newProcessor.mainField, '_value');

          //since we're defaulting the mainField, this should be included in the results.
          newProcessor.new = false;
        }
      }
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

  get model() {
    const result = [];
    let newFlag = false;

    _.forEach(this.processors, (processor) => {
      if (processor.new) {
        newFlag = true;
      }

      if (!newFlag) {
        result.push(processor.model);
      }
    });

    return result;
  }

}

ProcessorCollection.types = {
  MAIN: 'main processors',
  PROCESSOR_FAILURE: 'processor failure branch',
  GLOBAL_FAILURE: 'global failure branch',
  FOREACH: 'foreach branch'
};

ProcessorCollection.usedProcessorIds = [];
ProcessorCollection.resetIdCounters = function () {
  ProcessorCollection.usedProcessorIds = [];
  ProcessorCollection.processorCounters = {};
  _.forEach(ProcessorViewModels, (ViewModel) => {
    ProcessorCollection.processorCounters[ViewModel.id] = 0;
  });
};

ProcessorCollection.generateId = function (typeId) {
  if (!_.has(ProcessorCollection.processorCounters, typeId)) {
    return undefined;
  }

  const processorCounter = ProcessorCollection.processorCounters[typeId] += 1;
  const processorId = `${typeId}_${processorCounter}`;

  return processorId;
};

ProcessorCollection.useId = function (processorId) {
  ProcessorCollection.usedProcessorIds.push(processorId);
};
