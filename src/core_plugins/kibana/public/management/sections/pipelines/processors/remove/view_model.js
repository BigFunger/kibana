import { assign } from 'lodash';
import Processor from 'ui/pipelines/processor/view_model';

export default class Remove extends Processor {
  constructor(model) {
    super(
      'remove',
      'Remove',
      `Removes an existing field.`,
      'field',
      {
        field: ''
      },
      model
    );
  }

  get description() {
    const source = this.field || '?';
    return `[${source}]`;
  }

  get model() {
    return assign(
      super.model,
      {
        field: this.field || ''
      }
    );
  }
};
