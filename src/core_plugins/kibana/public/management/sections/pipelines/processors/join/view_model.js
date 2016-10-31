import { assign } from 'lodash';
import Processor from 'ui/pipelines/processor/processor';

export default class Join extends Processor {
  constructor(model) {
    super(
      'join',
      'Join',
      `Joins each element of an array into a single string using a
separator character between each element. `,
      'field',
      {
        field: '',
        separator: ''
      },
      model
    );
  }

  get description() {
    const source = this.field || '?';
    const separator = this.separator ? ` on '${this.separator}'` : '';
    return `[${source}]${separator}`;
  }

  get model() {
    return assign(
      super.model,
      {
        field: this.field || '',
        separator: this.separator || ''
      }
    );
  }
};
