import { assign, has } from 'lodash';

export default function (server) {
  const baseConverter = server.plugins.kibana.pipelines.processors.baseConverter;

  return {
    kibanaToEs: function (processorApiDocument) {
      const result = baseConverter.kibanaToEs(processorApiDocument, 'rename');
      assign(result.rename, {
        field: processorApiDocument.field,
        target_field: processorApiDocument.target_field,
        ignore_missing: processorApiDocument.ignore_missing
      });

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'rename');

      assign(result, {
        field: processorEsDocument.rename.field,
        target_field: processorEsDocument.rename.target_field,
        ignore_missing: processorEsDocument.rename.ignore_missing
      });

      if (!has(processorEsDocument.rename, 'ignore_missing')) {
        result.ignore_missing = false;
      }

      return result;
    }
  };
}
