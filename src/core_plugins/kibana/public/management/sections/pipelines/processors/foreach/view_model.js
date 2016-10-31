import { assign, cloneDeep, get, map } from 'lodash';
import Processor from 'ui/pipelines/processor/processor';
import ProcessorCollection from 'ui/pipelines/processor_collection/view_model';
import processorCollectionTypes from 'ui/pipelines/constants/processor_collection_types';

export default class Foreach extends Processor {
  constructor(model) {
    super(
      'foreach',
      'For Each',
      `Processes elements in an array of unknown length.`,
      'field',
      {
        field: ''
      },
      model
    );

    // this.processorCollection = new ProcessorCollection(
    //   processorRegistry,
    //   'For Each',
    //   get(model, 'processors'),
    //   processorCollectionTypes.FOREACH,
    //   this
    // );
    this.updateProcessorCollection();
  }

  setOutput(output, error) {
    if (this.new) return;

    super.updateOutput();

    if (this.innerProcessor) {
      this.innerProcessor.updateOutput();
    }
  }

  updateProcessorCollection() {
    this.processorCollection.valueField = this.field;
  }

  get description() {
    const target = this.field || '?';

    const processor = get(this.processorCollection, 'processors[0].title') || '?';
    return `[${processor}] on [${target}]`;
  }

  get model() {
    return assign(
      super.model,
      {
        field: this.field || '',
        processors: map(this.processorCollection.processors, processor => processor.model)
      }
    );
  }

  get innerProcessor() {
    return this.processorCollection.processors[0];
  }

  applySimulateResults(rootInput) {
    super.applySimulateResults(rootInput);

    if (this.innerProcessor) {
      if (this.simulateResult) {
        const innerSimulateResult = cloneDeep(this.simulateResult);
        innerSimulateResult.output = get(innerSimulateResult.output, this.targetField);
        this.innerProcessor.setSimulateResult(innerSimulateResult);
      } else {
        this.innerProcessor.setSimulateResult(undefined);
      }
    }
    const collection = { doc: get(this.inputObject.doc, this.targetField), meta: this.inputObject.meta };
    this.processorCollection.applySimulateResults(collection);
  }
};
