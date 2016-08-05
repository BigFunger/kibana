import _ from 'lodash';
import Processor from 'ui/ingest/processor/view_model';

export default class Fail extends Processor {
  constructor(processorRegistry, processorId, model) {
    super(
      processorRegistry,
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

//Fail.id = 'fail';
