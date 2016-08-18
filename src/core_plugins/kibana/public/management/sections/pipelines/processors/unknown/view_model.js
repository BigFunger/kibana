import _ from 'lodash';
import Processor from 'ui/ingest/processor/view_model';

export default class Unknown extends Processor {
  constructor(processorRegistry, processorId, model) {
    super(
      processorRegistry,
      processorId,
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
    return _.assign(
      super.model,
      {
        json: this.json || '',
        unknownTypeId: this.unknownTypeId || ''
      }
    );
  }
};
