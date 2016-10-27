import { assign, has } from 'lodash';

export default function (server) {
  const baseConverter = server.plugins.kibana.pipelines.processors.baseConverter;

  return {
    kibanaToEs: function (processorApiDocument) {
      const result = baseConverter.kibanaToEs(processorApiDocument, 'uppercase');
      assign(result.uppercase, {
        field: processorApiDocument.field,
        ignore_missing: processorApiDocument.ignore_missing
      });

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'uppercase');

      assign(result, {
        field: processorEsDocument.uppercase.field,
        ignore_missing: processorEsDocument.uppercase.ignore_missing
      });

      if (!has(processorEsDocument.uppercase, 'ignore_missing')) {
        result.ignore_missing = false;
      }

      return result;
    }
  };
}
