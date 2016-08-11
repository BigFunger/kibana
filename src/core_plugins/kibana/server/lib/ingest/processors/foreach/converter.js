import _ from 'lodash';
import processorArrayConverterProvider from '../processor_array/converter';

export default function (server) {
  const baseConverter = server.plugins.kibana.ingest.processors.baseConverterProvider(server);
  const processorArrayConverter = processorArrayConverterProvider(server);

  return {
    kibanaToEs: function (processorApiDocument) {
      const result = baseConverter.kibanaToEs(processorApiDocument, 'foreach');
      const processors = processorArrayConverter.kibanaToEs(processorApiDocument.processors);
      _.assign(result.foreach, {
        field: processorApiDocument.target_field,
        processor: _.first(processors) || {}
      });

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'foreach');

      _.assign(result, {
        target_field: processorEsDocument.foreach.field,
        processors: processorArrayConverter.esToKibana([processorEsDocument.foreach.processor])
      });

      return result;
    }
  };
}
