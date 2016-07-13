import _ from 'lodash';
import Processor from '../base/view_model';

export class Rename extends Processor {
  constructor(processorId, model) {
    super(
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

Rename.id = 'rename';
