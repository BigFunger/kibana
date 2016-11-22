import { assign, has } from 'lodash';

export default function (server) {
  const baseConverter = server.plugins.pipelines.processors.baseConverter;

  return {
    kibanaToEs: function (processorApiDocument) {
      const result = baseConverter.kibanaToEs(processorApiDocument, 'trim');
      assign(result.trim, {
        field: processorApiDocument.field,
        ignore_missing: processorApiDocument.ignore_missing
      });

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'trim');

      assign(result, {
        field: processorEsDocument.trim.field,
        ignore_missing: processorEsDocument.trim.ignore_missing
      });

      if (!has(processorEsDocument.trim, 'ignore_missing')) {
        result.ignore_missing = false;
      }

      return result;
    }
  };
}
