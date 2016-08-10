import _ from 'lodash';

export default function (baseConverter) {
  return {
    kibanaToEs: function (processorApiDocument) {
      const result = baseConverter.kibanaToEs(processorApiDocument, 'rename');
      _.assign(result.rename, {
        field: processorApiDocument.source_field,
        target_field: processorApiDocument.target_field
      });

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'rename');

      _.assign(result, {
        source_field: processorEsDocument.rename.field,
        target_field: processorEsDocument.rename.target_field
      });

      return result;
    }
  };
}
