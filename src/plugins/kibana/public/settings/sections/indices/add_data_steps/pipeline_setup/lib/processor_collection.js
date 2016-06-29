import _ from 'lodash';
import * as ProcessorViewModels from '../processors/view_models';


export default class ProcessorCollection {

  constructor(processors) {
    this.processors = [];
    this.input = {};

    this.ProcessorTypes = {};
    _.forIn(ProcessorViewModels, (ViewModel) => {
      this.ProcessorTypes[ViewModel.id] = ViewModel;
    });

    const collection = this;
    _.forEach(processors, (processor) => {
      collection.newAddExisting(processor);
    });
    this.updateParents();
  }

  add(ProcessorType, oldProcessor) {
    const processors = this.processors;

    const counter = ProcessorCollection.counter += 1;
    const processorId = `processor_${counter}`;
    const newProcessor = new ProcessorType(processorId, oldProcessor);
    processors.push(newProcessor);

    return newProcessor;
  }

  //TODO: Figure out how I want to do this consistantly.
  newAddExisting(processorModel) {
    const Type = this.ProcessorTypes[processorModel.typeId];
    const newProcessor = this.add(Type, processorModel);
    newProcessor.collapsed = true;
    newProcessor.new = false;

    return newProcessor;
  }

  addExisting(oldProcessor) {
    const Type = oldProcessor.constructor;
    const newProcessor = this.add(Type, oldProcessor.model);
    newProcessor.collapsed = true;
    newProcessor.new = false;

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

  updateParents(rootInput) {
    if (rootInput) {
      this.input = rootInput;
    }
    const processors = this.processors;

    //TODO: What benefit do we gfet from assigning parent of the first processor to the sample? Seems confusing.
    processors.forEach((processor, index) => {
      let newParent;
      if (index === 0) {
        newParent = this.input;
      } else {
        newParent = processors[index - 1];
      }

      //TODO: Once I add a processorCollection to processor, this needs to be recursive....
      processor.setParent(newParent);
    });
  }

  updateInputs() {
    this.processors.forEach((processor, index) => {
      if (index === 0) {
        processor.setInput(this.input);
      } else {
        //processor.setInput(processor.parent.outputObject);
        processor.setInput(processor.parent.output);
      }
    });
  }

  get output() {
    const lastValidProcessor = _.findLast(this.processors, (processor) => !!processor.output);
    return lastValidProcessor ? lastValidProcessor.output : undefined;
  }

}

ProcessorCollection.counter = 0;
