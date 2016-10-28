import { assign, isEmpty, get, difference, last } from 'lodash';
import keysDeep from 'ui/pipelines/lib/keys_deep';
import Processor from 'ui/pipelines/processor/view_model';

export default class Date extends Processor {
  constructor(model) {
    super(
      'date',
      'Date',
      `Parses dates from fields.`,
      'field',
      {
        field: '',
        targetField: '',
        formats: [],
        timezone: 'Etc/UTC',
        locale: 'ENGLISH'
      },
      model
    );
  }

  get description() {
    const inputKeys = keysDeep(get(this, 'processorShell.inputObject.doc'));
    const outputKeys = keysDeep(get(this, 'processorShell.outputObject.doc'));
    const addedKeys = difference(outputKeys, inputKeys);
    const chunks = [];

    if (this.field) chunks.push(` parse on '${this.field}'`);
    if (this.field && this.targetField) {
      chunks.push(` as '${this.targetField}'`);
    } else {
      if (addedKeys.length > 0) chunks.push(` as '${last(addedKeys)}'`);
    }

    return chunks.join('');
  }

  get model() {
    return assign(
      super.model,
      {
        field: this.field || '',
        targetField: this.targetField || '',
        formats: this.formats || [],
        timezone: this.timezone || '',
        locale: this.locale || ''
      }
    );
  }
};
