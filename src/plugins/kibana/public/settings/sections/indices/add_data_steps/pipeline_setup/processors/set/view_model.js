import _ from 'lodash';
import Processor from '../base/view_model';

export class Set extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'set',
      'Set',
      `Sets one field and associates it with the specified value. If the field
already exists, its value will be replaced with the provided one.`,
      'targetField',
      {
        targetField: '',
        value: ''
      },
      model
    );
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
        value: this.value || ''
      }
    );
  }
};

Set.id = 'set';
