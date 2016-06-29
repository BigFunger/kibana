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
    const result = baseConverter.esToKibana(processorEsDocument, 'lowercase');

    _.assign(result, {
      source_field: processorEsDocument.lowercase.field
    });

    return result;
  }
};
