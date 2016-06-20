import _ from 'lodash';
import ProcessorCollection from './processor_collection';

export default class Pipeline {

  constructor() {
    this.processorCollection = new ProcessorCollection();
    this.processorCollections = [];
    this.activeProcessorCollection = this.processorCollection;
    this.input = {};
    this.output = undefined;
    this.dirty = false;
    this.hasCompileError = false;
  }

  get model() {
    const pipeline = {
      input: this.input,
      processors: _.map(this.processorCollection.processors, processor => processor.model)
    };
    return pipeline;
  }

  setDirty() {
    this.dirty = true;
  }

  load(pipeline) {
    this.processorCollection = new ProcessorCollection();
    pipeline.processors.forEach((processor) => {
      this.processorCollection.addExisting(processor);
    });
  }

  ///TODO: Rename this function
  pushProcessorCollection(processorCollection) {
    this.processorCollections.push(this.activeProcessorCollection);
    this.activeProcessorCollection = processorCollection;
  }

  popProcessorCollection() {
    this.activeProcessorCollection = this.processorCollections.pop();
  }

  updateOutput() {
    const processors = _.reject(this.processors, { new: true });

    const errorIndex = _.findIndex(processors, 'error');
    const goodProcessor = errorIndex === -1 ? _.last(processors) : processors[errorIndex - 1];
    this.output = goodProcessor ? goodProcessor.outputObject : this.input;

    this.dirty = false;
  }

  // Updates the state of the pipeline and processors with the results
  // from an ingest simulate call.
  applySimulateResults(simulateResults) {
    updateProcessorOutputs(this, simulateResults);
    updateErrorState(this);
    this.processorCollection.updateInputs();
    this.updateOutput();
  }

  //Returns a flattened object containing one property per processor
  //regardless of where in the hierarchy it exists.
  getAllProcessors() {
    const result = {};

    function iteration(processorCollection) {
      _.forEach(processorCollection.processors, processor => {
        iteration(processor.errorProcessorCollection);
        result[processor.processorId] = processor;
      });
    }

    iteration(this.processorCollection);

    return result;
  }
}

function updateProcessorOutputs(pipeline, simulateResults) {
  //TODO: Should we instead loop through all the processors and look up the simulate result? :)
  const allProcessors = pipeline.getAllProcessors();

  simulateResults.forEach((result) => {
    const processor = allProcessors[result.processorId];

    if (processor) {
      const output = _.get(result, 'output');
      const error = _.get(result, 'error');
      processor.setOutput(output, error);
    }
  });
}

//Updates the error state of the pipeline and its processors
//If a pipeline compile error is returned, lock all processors but the error
//If a pipeline data error is returned, lock all processors after the error
function updateErrorState(pipeline) {
  // pipeline.hasCompileError = _.some(pipeline.processors, (processor) => {
  //   return _.get(processor, 'error.compile');
  // });
  // _.forEach(pipeline.processors, processor => {
  //   processor.locked = false;
  // });

  // const errorIndex = _.findIndex(pipeline.processors, 'error');
  // if (errorIndex === -1) return;

  // _.forEach(pipeline.processors, (processor, index) => {
  //   if (pipeline.hasCompileError && index !== errorIndex) {
  //     processor.locked = true;
  //   }
  //   if (!pipeline.hasCompileError && index > errorIndex) {
  //     processor.locked = true;
  //   }
  // });
}

// function updateInputs(pipeline) {
//   function iteration(processorCollection) {
//     _.forEach(processorCollection.processors, processor => {
//       if (!processor.parent.processorId) {
//         processor.setInputObject(processor.parent);
//       } else {
//         processor.setInputObject(processor.parent.outputObject);
//       }

//       iteration(processor.errorProcessorCollection);
//     });
//   };
// }
