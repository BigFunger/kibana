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
      {
        targetField: ''
      },
      model
    );

    this.processorCollection = new ProcessorCollection('processors', _.get(model, 'processors'));
  }

  setInput(newInputObject) {
    super.setInput(newInputObject);
    this.processorCollection.input = this.inputObject;
    this.processorCollection.updateInputs();
  }

  get description() {
    const target = this.targetField || '?';
    return `[${target}]`;
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
};

Foreach.id = 'foreach';
