import _ from 'lodash';
import Processor from 'ui/ingest/processor/view_model';

export default class Remove extends Processor {
  constructor(processorRegistry, processorId, model) {
    super(
      processorRegistry,
      processorId,
      'remove',
      'Remove',
      `Removes an existing field.`,
      'sourceField',
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

//Remove.id = 'remove';
