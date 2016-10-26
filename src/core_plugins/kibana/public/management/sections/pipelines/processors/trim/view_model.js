import { assign } from 'lodash';
import Processor from 'ui/pipelines/processor/view_model';

export default class Trim extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
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
