import { assign } from 'lodash';
import Processor from 'ui/pipelines/processor/view_model';

export default class Convert extends Processor {
  constructor(model) {
    super(
      'convert',
      'Convert',
      `Converts an existing field’s value to a different type, such as converting
a string to an integer. If the field value is an array, all members will be
converted.`,
      'field',
      {
        field: '',
        targetField: '',
        type: 'auto',
        ignoreMissing: false
      },
      model
    );
  }

  get description() {
    const chunks = [];

    if (this.field) chunks.push(` '${this.field}'`);
    if (this.field && this.type) chunks.push(` into ${this.type}`);
    if (this.targetField) chunks.push(` as '${this.targetField}'`);

    return chunks.join('');
  }

  get model() {
    return assign(
      super.model,
      {
        field: this.field || '',
        targetField: this.targetField || '',
        type: this.type || 'auto',
        ignoreMissing: this.ignoreMissing
      }
    );
  }
};
