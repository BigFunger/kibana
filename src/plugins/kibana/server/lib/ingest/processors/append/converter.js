import _ from 'lodash';
import baseConverter from '../base/converter';

export default {
  kibanaToEs: function (processorApiDocument) {
    const result = baseConverter.kibanaToEs(processorApiDocument, 'append');
    _.assign(result.append, {
      field: processorApiDocument.target_field,
      value: processorApiDocument.values
    });

    return result;
  },
  esToKibana: function (processorEsDocument) {
    const result = baseConverter.esToKibana(processorEsDocument, 'append');

    _.assign(result, {
      target_field: processorEsDocument.append.field,
      values: processorEsDocument.append.value
    });

    return result;
  }
};
