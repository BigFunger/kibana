import _ from 'lodash';

export default function (server) {
  const baseConverter = server.plugins.kibana.ingest.processors.baseConverterProvider(server);

  return {
    kibanaToEs: function (processorApiDocument) {
      const result = baseConverter.kibanaToEs(processorApiDocument, 'set');
      _.assign(result.set, {
        field: processorApiDocument.target_field,
        value: processorApiDocument.value
      });

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'set');

      _.assign(result, {
        target_field: processorEsDocument.set.field,
        value: processorEsDocument.set.value
      });

      return result;
    }
  };
}
