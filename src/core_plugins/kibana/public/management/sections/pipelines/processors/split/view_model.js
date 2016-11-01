import { assign } from 'lodash';
import Processor from 'ui/pipelines/processor/processor';

export default class Split extends Processor {
  constructor(model) {
    super(
      'split',
      'Split',
      `Splits a field into an array using a separator character.`,
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
