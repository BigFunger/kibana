import { assign } from 'lodash';
import Processor from 'ui/pipelines/processor/processor';

export default class Uppercase extends Processor {
  constructor(model) {
    super(
      'uppercase',
      'Uppercase',
      `Converts a string to its uppercase equivalent.`,
      'field',
      {
        field: '',
        ignoreMissing: false
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
        field: this.field || '',
        ignoreMissing: this.ignoreMissing
      }
    );
  }
};
