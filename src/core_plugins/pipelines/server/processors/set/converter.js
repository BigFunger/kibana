import { assign, isEmpty, has } from 'lodash';

export default function (server) {
  const baseConverter = server.plugins.pipelines.processors.baseConverter;

  return {
    kibanaToEs: function (processorApiDocument) {
      const result = baseConverter.kibanaToEs(processorApiDocument, 'set');
      assign(result.set, {
        field: processorApiDocument.field,
        value: processorApiDocument.value,
        override: processorApiDocument.override
      });

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'set');

      assign(result, {
        field: processorEsDocument.set.field,
        value: processorEsDocument.set.value,
        override: processorEsDocument.set.override
      });

      if (!has(processorEsDocument.set, 'override')) {
        result.override = true;
      }

      return result;
    }
  };
}
