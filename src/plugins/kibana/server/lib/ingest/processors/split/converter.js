import _ from 'lodash';
import baseConverter from '../base/converter';

export default {
  kibanaToEs: function (processorApiDocument) {
    const result = baseConverter.kibanaToEs(processorApiDocument, 'split');
    _.assign(result.split, {
      field: processorApiDocument.source_field,
      separator: processorApiDocument.separator
    });

    return result;
  },
  esToKibana: function (processorEsDocument) {
    const result = baseConverter.esToKibana(processorEsDocument, 'split');

    _.assign(result, {
      source_field: processorEsDocument.split.field,
      separator: processorEsDocument.split.separator
    });

    return result;
  }
};
