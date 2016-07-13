import _ from 'lodash';
import Processor from '../base/view_model';

export class Gsub extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'gsub',
      'Gsub',
      `Converts a string field by applying a regular expression and a replacement.`,
      'sourceField',
      {
        sourceField: '',
        pattern: '',
        replacement: ''
      },
      model
    );
  }

  get description() {
    const source = this.sourceField || '?';
    return `[${source}] - /${this.pattern}/ -> '${this.replacement}'`;
  }

  get model() {
    return _.assign(
      super.model,
      {
        sourceField: this.sourceField || '',
        pattern: this.pattern || '',
        replacement: this.replacement || ''
      }
    );
  }
};

Gsub.id = 'gsub';
