import _ from 'lodash';
import ProcessorShell from '../processor_shell/processor_shell';

export default class ProcessorCollection {

  constructor(pipeline, title, processors, type, parentProcessor) {
    this.pipeline = pipeline;
    this.title = title;
    this.type = type;
    this.valueField;
    this.processors = [];
    this.input = {};
    this.parentProcessor = parentProcessor;

    const collection = this;
    _.forEach(processors, (processorModel) => {
      collection.add(processorModel);
    });
    this.updateParents();
  }

  get allProcessors() {
    return _.reduce(this.processors, (result, processor) => {
      return _.assign(result, processor.allProcessors);
    }, {});
  }

  get allProcessorCollections() {
    return _.reduce(this.processors, (result, processorShell) => {
      return result.concat(processorShell.allProcessorCollections);
    }, [this]);
  }

  add(processorModel) {
    const processorShell = new ProcessorShell(this.pipeline, this, processorModel);

    if (this.processors.length === 0) {
      processorShell.setInput(this.input);
    } else {
      const lastProcessor = _.last(this.processors);
      processorShell.setInput(lastProcessor.outputObject);
    }

    this.processors.push(processorShell);
    this.updateParents();

    return processorShell;
  }

  remove(processor) {
    const processors = this.processors;
    const index = processors.indexOf(processor);

    processors.splice(index, 1);

    if (processors.length === 0 && this.parentProcessor) {
      this.parentProcessor.failureAction = 'index_fail';
    }

    this.updateParents();
  }

  updateParents() {
    this.processors.forEach((processor, index) => {
      const newParent = index > 0 ? this.processors[index - 1] : null;
      processor.setParent(newParent);
    });
  }

  applySimulateResults(rootInput) {
    this.input = rootInput;
    _.forEach(this.processors, (processorShell) => {
      processorShell.applySimulateResults(rootInput);
    });
  }

  get output() {
    const lastValidProcessor = _.findLast(this.processors, (processor) => !!processor.outputObject);
    return lastValidProcessor ? lastValidProcessor.outputObject : undefined;
  }

  get model() {
    const result = [];
    let newFlag = false;

    _.forEach(this.processors, (processorShell) => {
      result.push(processorShell.model);
    });

    return result;
  }
}
