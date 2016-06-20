import _ from 'lodash';
import Processor from '../base/view_model';

export class Lowercase extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'lowercase',
      'Lowercase',
      `Converts a string to its lowercase equivalent.`
    );

    _.defaults(
      this,
      _.pick(model, [
        'sourceField',
        'ignoreFailure'
      ]),
      {
        sourceField: '',
        ignoreFailure: 'index_fail'
      }
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
