import { assign, difference, get } from 'lodash';
import { keysDeep } from 'plugins/pipelines/lib/keys_deep';
import { Processor } from 'plugins/pipelines/lib/processor';

export default class Json extends Processor {
  constructor(model) {
    super(
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
    const chunks = [];

    if (this.field) chunks.push(` parse '${this.field}'`);
    if (this.targetField) chunks.push(` as '${this.targetField}'`);
    return chunks.join('');
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
