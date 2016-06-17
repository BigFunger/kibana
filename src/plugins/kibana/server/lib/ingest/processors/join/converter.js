import _ from 'lodash';
import baseConverter from '../base/converter';

export default {
  kibanaToEs: function (processorApiDocument) {
    const result = baseConverter.kibanaToEs(processorApiDocument, 'join');
    _.assign(result.join, {
      field: processorApiDocument.source_field,
      separator: processorApiDocument.separator
    });

    return result;
  },
  esToKibana: function (processorEsDocument) {
    if (!_.has(processorEsDocument, 'join')) {
      throw new Error('Elasticsearch processor document missing [join] property');
    }

    return {
      typeId: 'join',
      processor_id: processorEsDocument.join.tag,
      source_field: processorEsDocument.join.field,
      separator: processorEsDocument.join.separator,
      ignore_failure: processorEsDocument.join.ignore_failure
    };
  }
};
