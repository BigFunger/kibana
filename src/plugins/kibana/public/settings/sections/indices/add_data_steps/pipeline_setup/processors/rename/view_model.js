import _ from 'lodash';
import Processor from '../base/view_model';

export class Rename extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'rename',
      'Rename',
      `Renames an existing field.`
    );

    _.defaults(
      this,
      _.pick(model, [
        'sourceField',
        'targetField',
        'ignoreFailure'
      ]),
      {
        sourceField: '',
        targetField: '',
        ignoreFailure: 'index_fail'
      }
    );
  }

  get description() {
    const source = this.sourceField || '?';
    const target = this.targetField || '?';
    return `[${source}] -> [${target}]`;
  }

  get model() {
    return _.assign(
      super.model,
      {
        sourceField: this.sourceField || '',
        targetField: this.targetField || ''
      }
    );
  }
};
