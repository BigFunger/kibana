import { assign } from 'lodash';
import Processor from 'ui/pipelines/processor/processor';

export default class Trim extends Processor {
  constructor(model) {
    super(
      'trim',
      'Trim',
      `Trims whitespace from field.`,
      'field',
      {
        field: '',
        ignoreMissing: false
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
        ignoreMissing: this.ignoreMissing
      }
    );
  }
};
