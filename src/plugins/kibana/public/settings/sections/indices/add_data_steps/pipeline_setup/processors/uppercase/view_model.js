import _ from 'lodash';
import Processor from '../base/view_model';

export class Uppercase extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'uppercase',
      'Uppercase',
      `Converts a string to its uppercase equivalent.`
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
