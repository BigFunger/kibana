import _ from 'lodash';
import Processor from '../base/view_model';

export class Trim extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'trim',
      'Trim',
      `Trims whitespace from field.`,
      {
        sourceField: ''
      },
      model
    );
  }

  get description() {
    const source = this.sourceField || '?';
    return `[${source}]`;
  }

  get model() {
    return _.assign(
      super.model,
      {
        sourceField: this.sourceField || ''
      }
    );
  }
};

Trim.id = 'trim';
