import _ from 'lodash';
import * as processorConverters from '../converters';

export default {
  kibanaToEs: function (processorApiDocument, typeId) {
    const subObject = {
      tag: processorApiDocument.processor_id
    };

    if (processorApiDocument.ignore_failure === 'ignore_error') {
      subObject.ignore_failure = true;
    }

    if (processorApiDocument.ignore_failure === 'on_error') {
      subObject.on_failure = _.map(processorApiDocument.processors, (processor) => {
        const processorConverter = processorConverters[processor.type_id];
        return processorConverter.kibanaToEs(processor);
      });
    }

    const result = _.set({}, typeId, subObject);
    return result;
  },
  esToKibana: function (processorEsDocument, typeId) {
    throw new Error('Not Implemented.');
  }
};
