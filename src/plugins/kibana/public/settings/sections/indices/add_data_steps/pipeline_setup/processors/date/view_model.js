import _ from 'lodash';
import Processor from '../base/view_model';

export class Date extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'date',
      'Date',
      `Parses dates from fields.`,
      'sourceField',
      {
        sourceField: '',
        targetField: '@timestamp',
        formats: [],
        timezone: 'Etc/UTC',
        locale: 'ENGLISH',
        customFormat: ''
      },
      model
    );
  }

  get description() {
    const source = this.sourceField || '?';
    const target = this.targetField || '?';
    return `[${source}] -> [${target}]`;
  }

  get model() {
    return _.assign(
      super.model,
      {
        sourceField: this.sourceField || '',
        targetField: this.targetField || '',
        formats: this.formats || [],
        timezone: this.timezone || '',
        locale: this.locale || '',
        customFormat: this.customFormat || ''
      }
    );
  }
};

Date.id = 'date';
