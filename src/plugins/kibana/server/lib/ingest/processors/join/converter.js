import _ from 'lodash';

export default {
  kibanaToEs: function (processorApiDocument) {
    return {
      join: {
        tag: processorApiDocument.processor_id,
        field: processorApiDocument.source_field,
        separator: processorApiDocument.separator
      }
    };
  },
  esToKibana: function (processorEsDocument) {
    if (!_.has(processorEsDocument, 'join')) {
      throw new Error('Elasticsearch processor document missing [join] property');
    }

    return {
      typeId: 'join',
      processor_id: processorEsDocument.join.tag,
      source_field: processorEsDocument.join.field,
      separator: processorEsDocument.join.separator
    };
  }
};
