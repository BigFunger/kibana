import _ from 'lodash';
import keysDeep from 'ui/ingest/lib/keys_deep';
import Processor from 'ui/ingest/processor/view_model';

export default class Grok extends Processor {
  constructor(processorRegistry, processorId, model) {
    super(
      processorRegistry,
      processorId,
      'grok',
      'Grok',
      `Extracts structured fields out of a single text field within a document.
You choose which field to extract matched fields from, as well as the
grok pattern you expect will match. A grok pattern is like a regular
expression that supports aliased expressions that can be reused.`,
      'sourceField',
      {
        sourceField: '',
        patterns: [],
        traceMatch: false,
        patternDefinitions: []
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
        patterns: this.patterns || [],
        traceMatch: this.traceMatch,
        patternDefinitions: this.patternDefinitions || []
      }
    );
  }
};
