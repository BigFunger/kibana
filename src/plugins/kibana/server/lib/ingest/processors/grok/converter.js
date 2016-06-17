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
    if (!_.has(processorEsDocument, 'grok')) {
      throw new Error('Elasticsearch processor document missing [grok] property');
    }

    let pattern = '';
    if (processorEsDocument.grok.patterns.length > 0) {
      pattern = processorEsDocument.grok.patterns[0];
    }

    return {
      typeId: 'grok',
      processor_id: processorEsDocument.grok.tag,
      source_field: processorEsDocument.grok.field,
      pattern: pattern,
      ignore_failure: processorEsDocument.grok.ignore_failure
    };
  }
};
