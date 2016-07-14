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
    const result = baseConverter.esToKibana(processorEsDocument, 'trim');


    _.assign(result, {
      source_field: processorEsDocument.trim.field
    });

    return result;
  }
};
