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
    if (!_.has(processorEsDocument, 'split')) {
      throw new Error('Elasticsearch processor document missing [split] property');
    }

    return {
      typeId: 'split',
      processor_id: processorEsDocument.split.tag,
      source_field: processorEsDocument.split.field,
      separator: processorEsDocument.split.separator,
      ignore_failure: processorEsDocument.split.ignore_failure
    };
  }
};
