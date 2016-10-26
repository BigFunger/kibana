import { assign } from 'lodash';
import Processor from 'ui/pipelines/processor/view_model';

export default class Append extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'append',
      'Append',
      `Appends one or more values to an existing array if the field already exists
and it is an array. Converts a scalar to an array and appends one or more
values to it if the field exists and it is a scalar. Creates an array
containing the provided values if the field doesn’t exist.`,
      'field',
      {
        field: '',
        values: []
      },
      model
    );
  }

  get description() {
    const target = this.field || '?';
    return `[${target}]`;
  }

  get model() {
    return assign(
      super.model,
      {
        field: this.field || '',
        values: this.values || []
      }
    );
  }
};
