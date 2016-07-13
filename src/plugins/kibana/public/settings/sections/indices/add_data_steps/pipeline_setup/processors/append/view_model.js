import _ from 'lodash';
import Processor from '../base/view_model';

export class Append extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'append',
      'Append',
      `Appends one or more values to an existing array if the field already exists
and it is an array. Converts a scalar to an array and appends one or more
values to it if the field exists and it is a scalar. Creates an array
containing the provided values if the field doesn’t exist.`,
      'targetField',
      {
        targetField: '',
        values: []
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
        values: this.values || []
      }
    );
  }
};

Append.id = 'append';
