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
    if (!_.has(processorEsDocument, 'append')) {
      throw new Error('Elasticsearch processor document missing [append] property');
    }

    return {
      typeId: 'append',
      processor_id: processorEsDocument.append.tag,
      target_field: processorEsDocument.append.field,
      values: processorEsDocument.append.value,
      ignore_failure: processorEsDocument.append.ignore_failure
    };
  }
};
