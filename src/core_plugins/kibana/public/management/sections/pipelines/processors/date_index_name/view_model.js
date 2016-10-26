import { assign } from 'lodash';
import Processor from 'ui/pipelines/processor/view_model';

export default class DateIndexName extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'date_index_name',
      'Date Index Name',
      `Assigns the _index meta field with a date math index name expression based on the provided
index name prefix, date or timestamp field in the documents being
processed and the provided date rounding.`,
      'field',
      {
        field: '',
        indexNamePrefix: '',
        dateRounding: '',
        dateFormats: [],
        timezone: '',
        locale: '',
        indexNameFormat: ''
      },
      model
    );
  }

  get description() {
    const target = this.field || '?';
    return `[${target}]`;
  }

  get model() {
    return assign(
      super.model,
      {
        field: this.field || '',
        indexNamePrefix: this.indexNamePrefix || '',
        dateRounding: this.dateRounding || '',
        dateFormats: this.dateFormats || [],
        timezone: this.timezone || '',
        locale: this.locale || '',
        indexNameFormat: this.indexNameFormat || ''
      }
    );
  }
};
