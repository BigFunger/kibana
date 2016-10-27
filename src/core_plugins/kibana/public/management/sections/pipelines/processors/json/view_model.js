import { assign, difference, get } from 'lodash';
import keysDeep from 'ui/pipelines/lib/keys_deep';
import Processor from 'ui/pipelines/processor/view_model';

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
    const inputKeys = keysDeep(get(this, 'processorShell.inputObject.doc'));
    const outputKeys = keysDeep(get(this, 'processorShell.outputObject.doc'));
    const addedKeys = difference(outputKeys, inputKeys);
    const added = addedKeys.sort().map(field => `[${field}]`).join(', ');
    const source = this.field || '?';

    return `[${source}] -> ${added}`;
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
