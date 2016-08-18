import _ from 'lodash';

export default function (server) {
  const ingestManager = server.plugins.kibana.ingest;

  return {
    kibanaToEs: function (processorApiDocument) {
      const result = _.map(processorApiDocument, (processor) => {
        let processorConverter = ingestManager.processors.converters[processor.type_id];
        if (!processorConverter) {
          processorConverter = ingestManager.processors.converters.unknown;
        }

        return processorConverter.kibanaToEs(processor);
      });

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = _.map(processorEsDocument, (processor) => {
        const typeId = _.keys(processor)[0];
        let processorConverter = ingestManager.processors.converters[typeId];
        if (!processorConverter) {
          processorConverter = ingestManager.processors.converters.unknown;
        }

        return processorConverter.esToKibana(processor, typeId);
      });

      return result;
    }
  };
}
