import _ from 'lodash';

export default class ProcessorCollection {

  constructor(processors) {
    this.processors = [];
    this.input = {};
  }

  add(ProcessorType, oldProcessor) {
    const processors = this.processors;

    const counter = ProcessorCollection.counter += 1;
    const processorId = `processor_${counter}`;
    const newProcessor = new ProcessorType(processorId, oldProcessor);
    processors.push(newProcessor);

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

    processors.forEach((processor, index) => {
      let newParent;
      if (index === 0) {
        newParent = this.input;
      } else {
        newParent = processors[index - 1];
      }

      //TODO: Once I add a processorCollection to processor, this needs to be recursive.
      processor.setParent(newParent);
    });
  }

  getProcessorById(processorId) {
    const result = _.find(this.processors, { processorId });

    if (!result) {
      throw new Error(`Could not find processor by id [${processorId}]`);
    }

    return result;
  }

  updateInputs() {
    this.processors.forEach((processor) => {
      //we don't want to change the inputObject if the parent processor
      //is in error because that can cause us to lose state.
      if (!_.get(processor, 'parent.error')) {
        //the parent property of the first processor is set to the pipeline.input.
        //In all other cases it is set to processor[index-1]
        if (!processor.parent.processorId) {
          processor.inputObject = _.cloneDeep(processor.parent);
        } else {
          processor.inputObject = _.cloneDeep(processor.parent.outputObject);
        }
      }
    });
  }

}

ProcessorCollection.counter = 0;
