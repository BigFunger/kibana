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
    const result = baseConverter.esToKibana(processorEsDocument, 'uppercase');

    _.assign(result, {
      source_field: processorEsDocument.uppercase.field
    });

    return result;
  }
};
