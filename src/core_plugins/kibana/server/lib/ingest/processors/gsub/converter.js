import _ from 'lodash';
import baseConverter from '../base/converter';

export default {
  kibanaToEs: function (processorApiDocument) {
    const result = baseConverter.kibanaToEs(processorApiDocument, 'gsub');
    _.assign(result.gsub, {
      field: processorApiDocument.source_field,
      pattern: processorApiDocument.pattern,
      replacement: processorApiDocument.replacement
    });

    return result;
  },
  esToKibana: function (processorEsDocument) {
    const result = baseConverter.esToKibana(processorEsDocument, 'gsub');

    _.assign(result, {
      pattern: processorEsDocument.gsub.pattern,
      replacement: processorEsDocument.gsub.replacement
    });

    return result;
  }
};
