import _ from 'lodash';
import ingestPipelineConverter from '../pipeline/converter';

export default {
  kibanaToEs: function (simulateApiDocument) {
    return {
      pipeline: ingestPipelineConverter.kibanaToEs(simulateApiDocument.pipeline),
      docs: [
        {
          _source: simulateApiDocument.input
        }
      ]
    };
  },
  esToKibana: function (processorEsDocument) {
    throw new Error('Not implemented');
  }
};
