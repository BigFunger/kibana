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
    const result = baseConverter.esToKibana(processorEsDocument, 'join');

    _.assign(result, {
      source_field: processorEsDocument.join.field,
      separator: processorEsDocument.join.separator
    });

    return result;
  }
};
