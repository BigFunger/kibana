import { assign } from 'lodash';
import Processor from 'ui/pipelines/processor/view_model';

export default class Uppercase extends Processor {
  constructor(model) {
    super(
      'dot_expander',
      'Dot Expander',
      `Expands a field with dots into an object field.`,
      'field',
      {
        field: '',
        path: ''
      },
      model
    );
  }

  get description() {
    const source = this.field || '?';
    return `[${source}]`;
  }

  get model() {
    return assign(
      super.model,
      {
        field: this.field || '',
        path: this.path
      }
    );
  }
};
