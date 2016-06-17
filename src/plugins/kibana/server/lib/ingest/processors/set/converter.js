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
    if (!_.has(processorEsDocument, 'set')) {
      throw new Error('Elasticsearch processor document missing [set] property');
    }

    return {
      typeId: 'set',
      processor_id: processorEsDocument.set.tag,
      target_field: processorEsDocument.set.field,
      value: processorEsDocument.set.value,
      ignore_failure: processorEsDocument.set.ignore_failure
    };
  }
};
