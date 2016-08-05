import _ from 'lodash';
import Processor from 'ui/ingest/processor/view_model';

export default class Convert extends Processor {
  constructor(processorRegistry, processorId, model) {
    super(
      processorRegistry,
      processorId,
      'convert',
      'Convert',
      `Converts an existing field’s value to a different type, such as converting
a string to an integer. If the field value is an array, all members will be
converted.`,
      'sourceField',
      {
        sourceField: '',
        targetField: '',
        type: 'auto'
      },
      model
    );
  }

  get description() {
    const source = this.sourceField || '?';
    const type = this.type || '?';
    const target = this.targetField ? ` -> [${this.targetField}]` : '';
    return `[${source}] to ${type}${target}`;
  }

  get model() {
    return _.assign(
      super.model,
      {
        sourceField: this.sourceField || '',
        targetField: this.targetField || '',
        type: this.type || 'auto'
      }
    );
  }
};

//Convert.id = 'convert';
