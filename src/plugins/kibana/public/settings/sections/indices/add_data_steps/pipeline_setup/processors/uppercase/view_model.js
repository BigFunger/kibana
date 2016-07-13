import _ from 'lodash';
import Processor from '../base/view_model';

export class Uppercase extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'uppercase',
      'Uppercase',
      `Converts a string to its uppercase equivalent.`,
      'sourceField',
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

Uppercase.id = 'uppercase';
