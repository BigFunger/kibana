import _ from 'lodash';
import baseConverter from '../base/converter';

export default {
  kibanaToEs: function (processorApiDocument) {
    const result = baseConverter.kibanaToEs(processorApiDocument, 'fail');
    _.assign(result.fail, {
      message: processorApiDocument.message
    });

    return result;
  },
  esToKibana: function (processorEsDocument) {
    const result = baseConverter.esToKibana(processorEsDocument, 'fail');

    _.assign(result, {
      message: processorEsDocument.fail.message
    });

    return result;
  }
};
