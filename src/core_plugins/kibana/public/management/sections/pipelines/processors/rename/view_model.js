import _ from 'lodash';
import Processor from 'ui/ingest/processor/view_model';

export default class Rename extends Processor {
  constructor(processorRegistry, processorId, model) {
    super(
      processorRegistry,
      processorId,
      'rename',
      'Rename',
      `Renames an existing field.`,
      'sourceField',
      {
        sourceField: '',
        targetField: ''
      },
      model
    );
  }

  get description() {
    const source = this.sourceField || '?';
    const target = this.targetField || '?';
    return `[${source}] -> [${target}]`;
  }

  get model() {
    return _.assign(
      super.model,
      {
        sourceField: this.sourceField || '',
        targetField: this.targetField || ''
      }
    );
  }
};
