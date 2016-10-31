import { assign } from 'lodash';
import Processor from 'ui/pipelines/processor/processor';

export default class Lowercase extends Processor {
  constructor(model) {
    super(
      'lowercase',
      'Lowercase',
      `Converts a string to its lowercase equivalent.`,
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
