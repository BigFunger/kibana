import _ from 'lodash';
import keysDeep from '../../lib/keys_deep';
import Processor from '../base/view_model';

export class Grok extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'grok',
      'Grok',
      `Extracts structured fields out of a single text field within a document.
You choose which field to extract matched fields from, as well as the
grok pattern you expect will match. A grok pattern is like a regular
expression that supports aliased expressions that can be reused.`,
      {
        sourceField: '',
        pattern: ''
      },
      model
    );
  }

  get description() {
    const inputKeys = keysDeep(this.inputObject);
    const outputKeys = keysDeep(this.outputObject);
    const addedKeys = _.difference(outputKeys, inputKeys);
    const added = addedKeys.sort().map(field => `[${field}]`).join(', ');
    const source = this.sourceField || '?';

    return `[${source}] -> ${added}`;
  }

  get model() {
    return _.assign(
      super.model,
      {
        sourceField: this.sourceField || '',
        pattern: this.pattern || ''
      }
    );
  }
};

Grok.id = 'grok';
