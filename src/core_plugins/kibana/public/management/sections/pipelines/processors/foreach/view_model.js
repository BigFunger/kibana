import _ from 'lodash';
import Processor from '../base/view_model';
import ProcessorCollection from '../../lib/processor_collection';

export class Foreach extends Processor {
  constructor(processorId, model) {
    super(
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
      'For Each',
      _.get(model, 'processors'),
      ProcessorCollection.types.FOREACH,
      this
    );
    this.updateProcessorCollection();
  }

  setInput(newInputObject) {
    super.setInput(newInputObject);
    this.processorCollection.updateInputs(this.inputObject);
    this.updateProcessorCollection();
  }


  setOutput(output, error) {
    if (this.new) return;

    super.setOutput(output, error);

    if (this.processorCollection.processors.length > 0) {
      this.processorCollection.processors[0].setOutput(output, error);
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

  get allProcessors() {
    return _.assign(
      super.allProcessors,
      this.processorCollection.allProcessors);
  }
};

Foreach.id = 'foreach';
