import _ from 'lodash';
import Processor from '../base/view_model';

export class Remove extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'remove',
      'Remove',
      `Removes an existing field.`,
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

Remove.id = 'remove';
