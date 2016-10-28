import { assign, difference, get } from 'lodash';
import keysDeep from 'ui/pipelines/lib/keys_deep';
import Processor from 'ui/pipelines/processor/view_model';

export default class Grok extends Processor {
  constructor(model) {
    super(
      'grok',
      'Grok',
      `Extracts structured fields out of a single text field within a document.
You choose which field to extract matched fields from, as well as the
grok pattern you expect will match. A grok pattern is like a regular
expression that supports aliased expressions that can be reused.`,
      'field',
      {
        field: '',
        patterns: [],
        traceMatch: false,
        patternDefinitions: [],
        ignoreMissing: false
      },
      model
    );
  }

  get description() {
    const inputKeys = keysDeep(get(this, 'processorShell.inputObject.doc'));
    const outputKeys = keysDeep(get(this, 'processorShell.outputObject.doc'));
    const addedKeys = difference(outputKeys, inputKeys);
    const chunks = [];

    if (this.field) chunks.push(` '${this.field}'`);
    if (addedKeys.length === 1) chunks.push(` into '${addedKeys.length[0]}'`);
    if (addedKeys.length > 1) chunks.push(` into ${addedKeys.length} fields`);

    return chunks.join('');
  }

  get model() {
    return assign(
      super.model,
      {
        field: this.field || '',
        patterns: this.patterns || [],
        traceMatch: this.traceMatch,
        patternDefinitions: this.patternDefinitions || [],
        ignoreMissing: this.ignoreMissing || false,
      }
    );
  }
};
