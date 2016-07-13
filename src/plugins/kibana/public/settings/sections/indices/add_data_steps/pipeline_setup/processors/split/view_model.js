import _ from 'lodash';
import Processor from '../base/view_model';

export class Split extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'split',
      'Split',
      `Splits a field into an array using a separator character.`,
      'sourceField',
      {
        sourceField: '',
        separator: ''
      },
      model
    );
  }

  get description() {
    const source = this.sourceField || '?';
    const separator = this.separator || '?';
    return `[${source}] on '${separator}'`;
  }

  get model() {
    return _.assign(
      super.model,
      {
        sourceField: this.sourceField || '',
        separator: this.separator || ''
      }
    );
  }
};

Split.id = 'split';
