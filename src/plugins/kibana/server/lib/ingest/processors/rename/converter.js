import _ from 'lodash';
import baseConverter from '../base/converter';

export default {
  kibanaToEs: function (processorApiDocument) {
    const result = baseConverter.kibanaToEs(processorApiDocument, 'rename');
    _.assign(result.rename, {
      field: processorApiDocument.source_field,
      target_field: processorApiDocument.target_field
    });

    return result;
  },
  esToKibana: function (processorEsDocument) {
    if (!_.has(processorEsDocument, 'rename')) {
      throw new Error('Elasticsearch processor document missing [rename] property');
    }

    return {
      typeId: 'rename',
      processor_id: processorEsDocument.rename.tag,
      source_field: processorEsDocument.rename.field,
      target_field: processorEsDocument.rename.target_field,
      ignore_failure: processorEsDocument.rename.ignore_failure
    };
  }
};
