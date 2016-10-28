import { assign } from 'lodash';
import Processor from 'ui/pipelines/processor/view_model';

export default class Rename extends Processor {
  constructor(model) {
    super(
      'rename',
      'Rename',
      `Renames an existing field.`,
      'field',
      {
        field: '',
        targetField: '',
        ignoreMissing: false
      },
      model
    );
  }

  get description() {
    const chunks = [];

    chunks.push('Rename');
    if (this.field) chunks.push(` '${this.field}'`);
    if (this.targetField) chunks.push(` to '${this.targetField}'`);

    return chunks.join('');
  }

  get model() {
    return assign(
      super.model,
      {
        field: this.field || '',
        targetField: this.targetField || '',
        ignoreMissing: this.ignoreMissing
      }
    );
  }
};
