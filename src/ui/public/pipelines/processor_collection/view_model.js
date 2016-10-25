import _ from 'lodash';
import ProcessorShell from '../processor_shell/view_model';

export default class ProcessorCollection {

  constructor(processorRegistry, title, processors, type, parentProcessor) {
    this.title = title;
    this.type = type;
    this.valueField;
    this.processors = [];
    this.input = {};
    this.parentProcessor = parentProcessor;

    this.processorRegistry = processorRegistry;
    this.ProcessorTypes = {};

    this.ProcessorTypes = processorRegistry.byId;

    const collection = this;
    _.forEach(processors, (processorModel) => {
      collection.add(null, processorModel);
    });
    this.updateParents();
  }

  get allProcessors() {
    return _.reduce(this.processors, (result, processor) => {
      return _.assign(result, processor.allProcessors);
    }, {});
  }

  get allProcessorCollections() {
    return _.reduce(this.processors, (result, processor) => {
      return result.concat(processor.allProcessorCollections);
    }, [this]);
  }

  add(processorModel) {
    const processorShell = new ProcessorShell(this.processorRegistry, processorModel);

    if (this.processors.length === 0) {
      processorShell.setInput(this.input);
    } else {
      const lastProcessor = _.last(this.processors);
      processorShell.setInput(lastProcessor.output);
    }

    this.processors.push(processorShell);
    this.updateParents();

    return processorShell;
  }

  remove(processor) {
    const processors = this.processors;
    const index = processors.indexOf(processor);

    processors.splice(index, 1);

    this.updateParents();
  }

  updateParents() {
    this.processors.forEach((processor, index) => {
      const newParent = index > 0 ? this.processors[index - 1] : null;
      processor.setParent(newParent);
    });
  }

  applySimulateResults(rootInput) {
    _.forEach(this.processors, (processor) => {
      processor.applySimulateResults(rootInput);
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
      // if (processor.new) {
      //   newFlag = true;
      // }

      // if (!newFlag) {
      result.push(processor.model);
      // }
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
ProcessorCollection.resetIdCounters = function (processorRegistry) {
  ProcessorCollection.usedProcessorIds = [];
  ProcessorCollection.processorCounters = {};
  _.forIn(processorRegistry.byId, (registryItem, id) => {
    ProcessorCollection.processorCounters[id] = 0;
  });
};

ProcessorCollection.updateId = function (oldValue, requestedNewValue) {
  function isValid(val) {
    if (_.isEmpty(val)) return false;
    if (_.contains(ProcessorCollection.usedProcessorIds, val)) return false;

    return true;
  }

  if (!isValid(requestedNewValue)) {
    return oldValue;
  }

  const index = _.indexOf(ProcessorCollection.usedProcessorIds, oldValue);
  ProcessorCollection.usedProcessorIds[index] = requestedNewValue;
  return requestedNewValue;
};

ProcessorCollection.generateId = function (typeId) {
  if (!_.has(ProcessorCollection.processorCounters, typeId)) {
    return undefined;
  }

  let processorId;
  do {
    const processorCounter = ProcessorCollection.processorCounters[typeId] += 1;
    processorId = `${typeId}_${processorCounter}`;
  } while (_.includes(ProcessorCollection.usedProcessorIds, processorId));

  return processorId;
};

ProcessorCollection.useId = function (processorId) {
  ProcessorCollection.usedProcessorIds.push(processorId);
};
