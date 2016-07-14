import _ from 'lodash';
import * as processorConverters from '../converters';

export default {
  kibanaToEs: function (processorApiDocument, typeId) {
    const result = _.map(processorApiDocument, (processor) => {
      const processorConverter = processorConverters[processor.type_id];
      return processorConverter.kibanaToEs(processor);
    });

    return result;
  },
  esToKibana: function (processorEsDocument, typeId) {
    const result = _.map(processorEsDocument, (processor) => {
      const typeId = _.keys(processor)[0];
      const processorConverter = processorConverters[typeId];
      return processorConverter.esToKibana(processor, typeId);
    });

    return result;
  }
};
