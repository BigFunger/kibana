import _ from 'lodash';
import * as ingestProcessorApiKibanaToEsConverters from './ingest_processor_api_kibana_to_es_converters';

export default function ingestPipelineApiKibanaToEsConverter(pipelineApiDocument) {
  return {
    processors: _.map(pipelineApiDocument, (processor) => {
      console.log(ingestProcessorApiKibanaToEsConverters);
      console.log('processor.type_id', processor.type_id);
      console.log(ingestProcessorApiKibanaToEsConverters[processor.type_id]);
      return ingestProcessorApiKibanaToEsConverters[processor.type_id](processor);
    })
  };
}
