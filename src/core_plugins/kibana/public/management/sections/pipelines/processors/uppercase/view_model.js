import _ from 'lodash';
import Processor from 'ui/ingest/processor/view_model';

export default class Uppercase extends Processor {
  constructor(processorRegistry, processorId, model) {
    super(
      processorRegistry,
      processorId,
      'uppercase',
      'Uppercase',
      `Converts a string to its uppercase equivalent.`,
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
