import _ from 'lodash';
import baseConverter from '../base/converter';
import processorArrayConverter from '../processor_array/converter';

export default {
  kibanaToEs: function (processorApiDocument) {
    const result = baseConverter.kibanaToEs(processorApiDocument, 'foreach');
    _.assign(result.foreach, {
      field: processorApiDocument.target_field,
      processors: processorArrayConverter.kibanaToEs(processorApiDocument.processors)
    });

    return result;
  },
  esToKibana: function (processorEsDocument) {
    const result = baseConverter.esToKibana(processorEsDocument, 'foreach');

    _.assign(result, {
      target_field: processorEsDocument.foreach.field,
      processors: processorArrayConverter.esToKibana(processorEsDocument.processors)
    });

    return result;
  }
};
