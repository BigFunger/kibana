import _ from 'lodash';

export default function (server) {
  const baseConverter = server.plugins.kibana.ingest.processors.baseConverterProvider(server);

  return {
    kibanaToEs: function (processorApiDocument) {
      const unknownTypeId = _.get(processorApiDocument, 'unknown_type_id');
      const result = baseConverter.kibanaToEs(processorApiDocument, unknownTypeId);
      const innerObject = _.get(result, unknownTypeId);

      _.assign(innerObject, _.get(processorApiDocument, 'json'));

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const unknownTypeId = _.keys(processorEsDocument)[0];
      const result = baseConverter.esToKibana(processorEsDocument, unknownTypeId);
      const processor = _.get(processorEsDocument, unknownTypeId);
      const json = _.omit(processor, ['tag', 'on_failure']);

      _.assign(result, {
        type_id: 'unknown',
        unknown_type_id: unknownTypeId,
        json: json
      });

      return result;
    }
  };
}
