import _ from 'lodash';
import baseConverter from '../base/converter';

export default {
  kibanaToEs: function (processorApiDocument) {
    const result = baseConverter.kibanaToEs(processorApiDocument, 'trim');
    _.assign(result.trim, {
      field: processorApiDocument.source_field
    });

    return result;
  },
  esToKibana: function (processorEsDocument) {
    if (!_.has(processorEsDocument, 'trim')) {
      throw new Error('Elasticsearch processor document missing [trim] property');
    }

    return {
      typeId: 'trim',
      processor_id: processorEsDocument.trim.tag,
      source_field: processorEsDocument.trim.field,
      ignore_failure: processorEsDocument.trim.ignore_failure
    };
  }
};
