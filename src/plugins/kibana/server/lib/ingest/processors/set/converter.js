import _ from 'lodash';
import baseConverter from '../base/converter';

export default {
  kibanaToEs: function (processorApiDocument) {
    const result = baseConverter.kibanaToEs(processorApiDocument, 'set');
    _.assign(result.set, {
      field: processorApiDocument.target_field,
      value: processorApiDocument.value
    });

    return result;
  },
  esToKibana: function (processorEsDocument) {
    const result = baseConverter.esToKibana(processorEsDocument, 'set');

    _.assign(result, {
      target_field: processorEsDocument.set.field,
      value: processorEsDocument.set.value
    });

    return result;
  }
};
