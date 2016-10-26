import { assign } from 'lodash';
import Processor from 'ui/pipelines/processor/view_model';

export default class Uppercase extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
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
