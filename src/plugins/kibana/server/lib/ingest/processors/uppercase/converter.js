import _ from 'lodash';
import baseConverter from '../base/converter';

export default {
  kibanaToEs: function (processorApiDocument) {
    const result = baseConverter.kibanaToEs(processorApiDocument, 'uppercase');
    _.assign(result.uppercase, {
      field: processorApiDocument.source_field
    });

    return result;
  },
  esToKibana: function (processorEsDocument) {
    if (!_.has(processorEsDocument, 'uppercase')) {
      throw new Error('Elasticsearch processor document missing [uppercase] property');
    }

    return {
      typeId: 'uppercase',
      processor_id: processorEsDocument.uppercase.tag,
      source_field: processorEsDocument.uppercase.field,
      ignore_failure: processorEsDocument.uppercase.ignore_failure
    };
  }
};
