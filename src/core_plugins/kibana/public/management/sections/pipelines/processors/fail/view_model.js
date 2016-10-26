import { assign } from 'lodash';
import Processor from 'ui/pipelines/processor/view_model';

export default class Fail extends Processor {
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
    return assign(
      super.model,
      {
        message: this.message || ''
      }
    );
  }
};
