import { assign } from 'lodash';
import Processor from 'ui/pipelines/processor/view_model';

export default class Gsub extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
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
    const source = this.field || '?';
    return `[${source}] - /${this.pattern}/ -> '${this.replacement}'`;
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
