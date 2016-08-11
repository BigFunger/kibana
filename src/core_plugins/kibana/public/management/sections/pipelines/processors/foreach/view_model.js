import _ from 'lodash';
import Processor from 'ui/ingest/processor/view_model';
import ProcessorCollection from 'ui/ingest/lib/processor_collection';

export default class Foreach extends Processor {
  constructor(processorRegistry, processorId, model) {
    super(
      processorRegistry,
      processorId,
      'foreach',
      'For Each',
      `Processes elements in an array of unknown length.`,
      'targetField',
      {
        targetField: ''
      },
      model
    );

    this.processorCollection = new ProcessorCollection(
      processorRegistry,
      'For Each',
      _.get(model, 'processors'),
      ProcessorCollection.types.FOREACH,
      this
    );
    this.updateProcessorCollection();
  }

  setOutput(output, error) {
    if (this.new) return;

    super.setOutput(output, error);

    if (this.innerProcessor) {
      this.innerProcessor.setOutput(output, error);
    }
  }

  updateProcessorCollection() {
    this.processorCollection.valueField = this.targetField;
  }

  get description() {
    const target = this.targetField || '?';

    const processor = _.get(this.processorCollection, 'processors[0].title') || '?';
    return `[${processor}] on [${target}]`;
  }

  get model() {
    return _.assign(
      super.model,
      {
        targetField: this.targetField || '',
        processors: _.map(this.processorCollection.processors, processor => processor.model)
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
        const innerSimulateResult = _.cloneDeep(this.simulateResult);
        innerSimulateResult.output = _.get(innerSimulateResult.output, this.targetField);
        this.innerProcessor.setSimulateResult(innerSimulateResult);
      } else {
        this.innerProcessor.setSimulateResult(undefined);
      }
    }
    const collection = _.get(this.inputObject, this.targetField);
    this.processorCollection.applySimulateResults(collection);
  }
};
