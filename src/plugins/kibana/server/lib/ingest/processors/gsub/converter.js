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
    if (!_.has(processorEsDocument, 'gsub')) {
      throw new Error('Elasticsearch processor document missing [gsub] property');
    }

    return {
      typeId: 'gsub',
      processor_id: processorEsDocument.gsub.tag,
      source_field: processorEsDocument.gsub.field,
      pattern: processorEsDocument.gsub.pattern,
      replacement: processorEsDocument.gsub.replacement,
      ignore_failure: processorEsDocument.gsub.ignore_failure
    };
  }
};
