import _ from 'lodash';
import baseConverter from '../base/converter';

export default {
  kibanaToEs: function (processorApiDocument) {
    const result = baseConverter.kibanaToEs(processorApiDocument, 'lowercase');
    _.assign(result.lowercase, {
      field: processorApiDocument.source_field
    });

    return result;
  },
  esToKibana: function (processorEsDocument) {
    if (!_.has(processorEsDocument, 'lowercase')) {
      throw new Error('Elasticsearch processor document missing [lowercase] property');
    }

    return {
      typeId: 'lowercase',
      processor_id: processorEsDocument.lowercase.tag,
      source_field: processorEsDocument.lowercase.field,
      ignore_failure: processorEsDocument.lowercase.ignore_failure
    };
  }
};
