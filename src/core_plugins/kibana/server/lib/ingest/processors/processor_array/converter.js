import _ from 'lodash';

export default function (server) {
  const kibana = server.plugins.kibana;
  const ingestManager = kibana.ingest;

  return {
    kibanaToEs: function (processorApiDocument) {
      const result = _.map(processorApiDocument, (processor) => {
        const processorConverter = ingestManager.processors.converters[processor.type_id];
        return processorConverter.kibanaToEs(processor);
      });

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = _.map(processorEsDocument, (processor) => {
        const typeId = _.keys(processor)[0];
        const processorConverter = ingestManager.processors.converters[typeId];
        return processorConverter.esToKibana(processor, typeId);
      });

      return result;
    }
  };
}
