import _ from 'lodash';
import baseConverter from '../base/converter';

export default {
  kibanaToEs: function (processorApiDocument) {
    const result = baseConverter.kibanaToEs(processorApiDocument, 'remove');
    _.assign(result.remove, {
      field: processorApiDocument.source_field
    });

    return result;
  },
  esToKibana: function (processorEsDocument) {
    if (!_.has(processorEsDocument, 'remove')) {
      throw new Error('Elasticsearch processor document missing [remove] property');
    }

    return {
      typeId: 'remove',
      processor_id: processorEsDocument.remove.tag,
      source_field: processorEsDocument.remove.field,
      ignore_failure: processorEsDocument.remove.ignore_failure
    };
  }
};
