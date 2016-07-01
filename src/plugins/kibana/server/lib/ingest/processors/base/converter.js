import _ from 'lodash';
import * as processorConverters from '../converters';

export default {
  kibanaToEs: function (processorApiDocument, typeId) {
    const subObject = {
      tag: processorApiDocument.processor_id
    };

    if (processorApiDocument.failure_action === 'ignore_error') {
      subObject.ignore_failure = true;
    }

    if (processorApiDocument.failure_action === 'on_error' && processorApiDocument.processors.length > 0) {
      subObject.on_failure = _.map(processorApiDocument.processors, (processor) => {
        const processorConverter = processorConverters[processor.type_id];
        return processorConverter.kibanaToEs(processor);
      });
    }

    const result = _.set({}, typeId, subObject);
    return result;
  },
  esToKibana: function (processorEsDocument, typeId) {
    if (!_.has(processorEsDocument, typeId)) {
      throw new Error(`Elasticsearch processor document missing [${typeId}] property`);
    }

    const subObject = _.get(processorEsDocument, typeId);

    const result = {
      type_id: typeId,
      processor_id: subObject.tag
    };

    result.processors = _.map(subObject.on_failure, (processor) => {
      const typeId = _.keys(processor)[0];
      const processorConverter = processorConverters[typeId];
      return processorConverter.esToKibana(processor, typeId);
    });

    if (subObject.on_failure) {
      result.failure_action = 'on_error';
    } else if (subObject.ignore_failure === true) {
      result.failure_action = 'ignore_error';
    } else {
      result.failure_action = 'index_fail';
    }

    return result;
  }
};
