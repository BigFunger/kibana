import _ from 'lodash';

export default {
  kibanaToEs: function (processorApiDocument, typeId) {
    const subObject = {
      tag: processorApiDocument.processor_id
    };

    if (processorApiDocument.ignore_failure === 'ignore_error') {
      subObject.ignore_failure = true;
    }

    if (processorApiDocument.ignore_failure === 'on_error') {
      //build the on_error array;
    }

    const result = _.set({}, typeId, subObject);
    return result;
  },
  esToKibana: function (processorEsDocument, typeId) {
    throw new Error('Not Implemented.');
  }
};
