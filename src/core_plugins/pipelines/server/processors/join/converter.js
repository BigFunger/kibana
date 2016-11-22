import { assign } from 'lodash';

export default function (server) {
  const baseConverter = server.plugins.pipelines.processors.baseConverter;

  return {
    kibanaToEs: function (processorApiDocument) {
      const result = baseConverter.kibanaToEs(processorApiDocument, 'join');
      assign(result.join, {
        field: processorApiDocument.field,
        separator: processorApiDocument.separator
      });

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'join');

      assign(result, {
        field: processorEsDocument.join.field,
        separator: processorEsDocument.join.separator
      });

      return result;
    }
  };
}
