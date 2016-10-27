import { assign } from 'lodash';
import Processor from 'ui/pipelines/processor/view_model';

export default class Rename extends Processor {
  constructor(model) {
    super(
      'rename',
      'Rename',
      `Renames an existing field.`,
      'field',
      {
        field: '',
        targetField: '',
        ignoreMissing: false
      },
      model
    );
  }

  get description() {
    const source = this.field || '?';
    const target = this.targetField || '?';
    return `[${source}] -> [${target}]`;
  }

  get model() {
    return assign(
      super.model,
      {
        field: this.field || '',
        targetField: this.targetField || '',
        ignoreMissing: this.ignoreMissing
      }
    );
  }
};
