import { assign } from 'lodash';

export default function (server) {
  const baseConverter = server.plugins.pipelines.processors.baseConverter;

  return {
    kibanaToEs: function (processorApiDocument) {
      const result = baseConverter.kibanaToEs(processorApiDocument, 'append');
      assign(result.append, {
        field: processorApiDocument.field,
        value: processorApiDocument.values
      });

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'append');

      assign(result, {
        field: processorEsDocument.append.field,
        values: processorEsDocument.append.value
      });

      return result;
    }
  };
}
