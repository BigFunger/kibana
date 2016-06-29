import _ from 'lodash';
import Processor from '../base/view_model';

export class Lowercase extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'lowercase',
      'Lowercase',
      `Converts a string to its lowercase equivalent.`,
      {
        sourceField: '',
        ignoreFailure: 'index_fail'
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

Lowercase.id = 'lowercase';
