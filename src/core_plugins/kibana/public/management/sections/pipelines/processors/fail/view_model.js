import _ from 'lodash';
import Processor from '../base/view_model';

export class Fail extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'fail',
      'Fail',
      `Raises an exception.`,
      null,
      {
        message: ''
      },
      model
    );
  }

  get description() {
    const message = this.message;
    return `[${message}]`;
  }

  get model() {
    return _.assign(
      super.model,
      {
        message: this.message || ''
      }
    );
  }
};

Fail.id = 'fail';
