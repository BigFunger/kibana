import _ from 'lodash';
import Processor from '../base/view_model';

export class Remove extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'remove',
      'Remove',
      `Removes an existing field.`
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
