import _ from 'lodash';
import Processor from 'ui/ingest/processor/view_model';

export default class Join extends Processor {
  constructor(processorRegistry, processorId, model) {
    super(
      processorRegistry,
      processorId,
      'join',
      'Join',
      `Joins each element of an array into a single string using a
separator character between each element. `,
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
    const separator = this.separator ? ` on '${this.separator}'` : '';
    return `[${source}]${separator}`;
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

//Join.id = 'join';
