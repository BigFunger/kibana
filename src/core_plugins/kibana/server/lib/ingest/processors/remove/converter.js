import _ from 'lodash';

export default function (baseConverter) {
  return {
    kibanaToEs: function (processorApiDocument) {
      const result = baseConverter.kibanaToEs(processorApiDocument, 'remove');
      _.assign(result.remove, {
        field: processorApiDocument.source_field
      });

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'remove');

      _.assign(result, {
        source_field: processorEsDocument.remove.field
      });

      return result;
    }
  };
}
