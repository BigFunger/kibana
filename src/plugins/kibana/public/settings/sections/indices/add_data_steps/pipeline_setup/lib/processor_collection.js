import _ from 'lodash';

export default class ProcessorCollection {

  constructor(processors) {
    this.processors = [];
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

  updateParents() {
    const processors = this.processors;

    processors.forEach((processor, index) => {
      let newParent;
      if (index === 0) {
        newParent = this.input;
      } else {
        newParent = processors[index - 1];
      }

      processor.setParent(newParent);
    });
    this.dirty = true;
  }

  getProcessorById(processorId) {
    const result = _.find(this.processors, { processorId });

    if (!result) {
      throw new Error(`Could not find processor by id [${processorId}]`);
    }

    return result;
  }

}

ProcessorCollection.counter = 0;
