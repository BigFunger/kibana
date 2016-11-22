import { assign, has } from 'lodash';

export default function (server) {
  const baseConverter = server.plugins.pipelines.processors.baseConverter;

  return {
    kibanaToEs: function (processorApiDocument) {
      const result = baseConverter.kibanaToEs(processorApiDocument, 'lowercase');
      assign(result.lowercase, {
        field: processorApiDocument.field,
        ignore_missing: processorApiDocument.ignore_missing
      });

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'lowercase');

      assign(result, {
        field: processorEsDocument.lowercase.field,
        ignore_missing: processorEsDocument.lowercase.ignore_missing
      });

      if (!has(processorEsDocument.lowercase, 'ignore_missing')) {
        result.ignore_missing = false;
      }

      return result;
    }
  };
}
