import { assign } from 'lodash';
import { Processor } from 'plugins/pipelines/lib/processor';

export default class Gsub extends Processor {
  constructor(model) {
    super(
      'gsub',
      'Gsub',
      `Converts a string field by applying a regular expression and a replacement.`,
      'field',
      {
        field: '',
        pattern: '',
        replacement: ''
      },
      model
    );
  }

  get description() {
    const chunks = [];

    if (this.field) chunks.push(` on '${this.field}'`);
    if (this.pattern) chunks.push(` to replace /${this.pattern}/`);
    if (this.replacement) chunks.push(` with '${this.replacement}'`);
    return chunks.join('');
  }

  get model() {
    return assign(
      super.model,
      {
        field: this.field || '',
        pattern: this.pattern || '',
        replacement: this.replacement || ''
      }
    );
  }
};
