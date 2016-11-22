import { assign } from 'lodash';
import { Processor } from 'plugins/pipelines/lib/processor';

export default class Unknown extends Processor {
  constructor(model) {
    super(
      'unknown',
      'Unknown',
      `Dummy`,
      undefined,
      {
        json: '',
        unknownTypeId: ''
      },
      model
    );
  }

  get description() {
    return `(${this.unknownTypeId})`;
  }

  get model() {
    return assign(
      super.model,
      {
        json: this.json || '',
        unknownTypeId: this.unknownTypeId || ''
      }
    );
  }
};
