import { assign } from 'lodash';
import { Processor } from 'plugins/pipelines/lib/processor';

export default class Remove extends Processor {
  constructor(model) {
    super(
      'remove',
      'Remove',
      `Removes an existing field.`,
      'field',
      {
        field: ''
      },
      model
    );
  }

  get description() {
    const chunks = [];

    if (this.field) chunks.push(` '${this.field}'`);
    return chunks.join('');
  }

  get model() {
    return assign(
      super.model,
      {
        field: this.field || ''
      }
    );
  }
};
