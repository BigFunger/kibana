import _ from 'lodash';
import * as processorConverters from '../processors/converters';

export default {
  kibanaToEs: function (pipelineApiDocument) {
    const result = {
      description: pipelineApiDocument.description,
      processors: _.map(pipelineApiDocument.processors, (processor) => {
        const processorConverter = processorConverters[processor.type_id];
        return processorConverter.kibanaToEs(processor);
      })
    };

    if (pipelineApiDocument.failure_action === 'on_error' &&
      pipelineApiDocument.error_processors.length > 0) {
      result.on_failure = _.map(pipelineApiDocument.error_processors, (processor) => {
        const processorConverter = processorConverters[processor.type_id];
        return processorConverter.kibanaToEs(processor);
      });
    }

    return result;
  },
  esToKibana: function (pipelineEsDocument) {
    const result = {
      pipeline_id: pipelineEsDocument.id,
      description: pipelineEsDocument.config.description
    };

    result.processors = _.map(pipelineEsDocument.config.processors, (processor) => {
      const typeId = _.keys(processor)[0];
      const processorConverter = processorConverters[typeId];
      return processorConverter.esToKibana(processor);
    });

    if (pipelineEsDocument.config.on_failure) {
      result.failure_action = 'on_error';
      result.error_processors = _.map(pipelineEsDocument.config.on_failure, (processor) => {
        const typeId = _.keys(processor)[0];
        const processorConverter = processorConverters[typeId];
        return processorConverter.esToKibana(processor);
      });
    } else {
      result.failure_action = 'index_fail';
    }

    return result;
  }
};
