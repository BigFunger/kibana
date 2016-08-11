import _ from 'lodash';
import Processor from 'ui/ingest/processor/view_model';

export default class Lowercase extends Processor {
  constructor(processorRegistry, processorId, model) {
    super(
      processorRegistry,
      processorId,
      'lowercase',
      'Lowercase',
      `Converts a string to its lowercase equivalent.`,
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
