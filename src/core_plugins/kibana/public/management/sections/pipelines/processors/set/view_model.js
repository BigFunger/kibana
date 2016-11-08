import { assign } from 'lodash';
import Processor from 'ui/pipelines/processor/processor';

export default class Set extends Processor {
  constructor(model) {
    super(
      'set',
      'Set',
      `Sets one field and associates it with the specified value. If the field
already exists, its value will be replaced with the provided one.`,
      'field',
      {
        field: '',
        value: '',
        override: true
      },
      model
    );
  }

  get description() {
    const chunks = [];

    if (this.field) chunks.push(` value of '${this.field}'`);
    return chunks.join('');
  }

  get errorConversions() {
    return [
      {
        pattern: /path cannot be null nor empty/,
        matchLength: 1,
        substitution: (matches) => {
          if (!this.field) {
            return {
              message: `Target Field is required`,
              field: 'field'
            };
          }
        },
      }
    ];
  };

  get model() {
    return assign(
      super.model,
      {
        field: this.field || '',
        value: this.value || '',
        override: this.override
      }
    );
  }
};
