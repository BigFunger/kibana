import _ from 'lodash';
import baseConverter from '../base/converter';

export default {
  kibanaToEs: function (processorApiDocument) {
    const result = baseConverter.kibanaToEs(processorApiDocument, 'grok');
    _.assign(result.grok, {
      field: processorApiDocument.source_field,
      patterns: [ processorApiDocument.pattern ]
    });

    return result;
  },
  esToKibana: function (processorEsDocument) {
    const result = baseConverter.esToKibana(processorEsDocument, 'grok');

    let pattern = '';
    if (processorEsDocument.grok.patterns.length > 0) {
      pattern = processorEsDocument.grok.patterns[0];
    }

    _.assign(result, {
      source_field: processorEsDocument.grok.field,
      pattern: pattern
    });

    return result;
  }
};
