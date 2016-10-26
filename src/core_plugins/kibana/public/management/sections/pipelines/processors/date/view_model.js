import { assign, isEmpty } from 'lodash';
import Processor from 'ui/pipelines/processor/view_model';

export default class Date extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'date',
      'Date',
      `Parses dates from fields.`,
      'field',
      {
        field: '',
        targetField: '@timestamp',
        formats: [],
        timezone: 'Etc/UTC',
        locale: 'ENGLISH'
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
        targetField: this.targetField || '',
        formats: this.formats || [],
        timezone: this.timezone || '',
        locale: this.locale || ''
      }
    );
  }
};
