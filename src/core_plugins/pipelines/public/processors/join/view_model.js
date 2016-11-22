import { assign } from 'lodash';
import { Processor } from 'plugins/pipelines/lib/processor';

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
    const chunks = [];

    if (this.field) chunks.push(` '${this.field}'`);
    if (this.separator) chunks.push(` on '${this.separator}'`);
    return chunks.join('');
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
