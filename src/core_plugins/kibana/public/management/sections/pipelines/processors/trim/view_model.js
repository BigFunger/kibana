import _ from 'lodash';
import Processor from 'ui/ingest/processor/view_model';

export default class Trim extends Processor {
  constructor(processorRegistry, processorId, model) {
    super(
      processorRegistry,
      processorId,
      'trim',
      'Trim',
      `Trims whitespace from field.`,
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

//Trim.id = 'trim';
