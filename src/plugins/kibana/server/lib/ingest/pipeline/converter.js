import _ from 'lodash';
import processorArrayConverter from '../processors/processor_array/converter';
//import * as processorConverters from '../processors/converters';

export default {
  kibanaToEs: function (pipelineApiDocument) {
    const result = {
      description: pipelineApiDocument.description,
      processors: processorArrayConverter.kibanaToEs(pipelineApiDocument.processors)
    };

    if (pipelineApiDocument.failure_action === 'on_error' &&
      pipelineApiDocument.failure_processors.length > 0) {
      result.on_failure = processorArrayConverter.kibanaToEs(pipelineApiDocument.failure_processors);
    }

    return result;
  },
  esToKibana: function (pipelineEsDocument) {
    const result = {
      pipeline_id: pipelineEsDocument.id,
      description: pipelineEsDocument.config.description,
      processors: processorArrayConverter.esToKibana(pipelineEsDocument.config.processors)
    };

    if (pipelineEsDocument.config.on_failure) {
      result.failure_action = 'on_error';
      result.failure_processors = processorArrayConverter.esToKibana(pipelineEsDocument.config.on_failure);
    } else {
      result.failure_action = 'index_fail';
    }

    return result;
  }
};
