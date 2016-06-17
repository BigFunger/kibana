import _ from 'lodash';

export default {
  kibanaToEs: function (processorApiDocument) {
    return {
      split: {
        tag: processorApiDocument.processor_id,
        field: processorApiDocument.source_field,
        separator: processorApiDocument.separator,
        ignore_failure: processorApiDocument.ignore_failure
      }
    };
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
