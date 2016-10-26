import { assign, isEmpty } from 'lodash';
import Processor from 'ui/pipelines/processor/view_model';

export default class Json extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'json',
      'JSON',
      `Converts a JSON string into a structured JSON object.`,
      'field',
      {
        field: '',
        targetField: ''
      },
      model
    );
  }

  get description() {
    const source = this.field || '?';
    const target = this.targetField || '?';
    if (isEmpty(target)) {
      return `[${source}]`;
    } else {
      return `[${source}] -> [${target}]`;
    }
  }

  get model() {
    return assign(
      super.model,
      {
        field: this.field || '',
        targetField: this.targetField || ''
      }
    );
  }
};
