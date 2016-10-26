import { assign } from 'lodash';
import Processor from 'ui/pipelines/processor/view_model';

export default class Split extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'split',
      'Split',
      `Splits a field into an array using a separator character.`,
      'field',
      {
        field: '',
        separator: ''
      },
      model
    );
  }

  get description() {
    const source = this.field || '?';
    const separator = this.separator || '?';
    return `[${source}] on '${separator}'`;
  }

  get model() {
    return assign(
      super.model,
      {
        field: this.field || '',
        separator: this.separator || ''
      }
    );
  }
};
