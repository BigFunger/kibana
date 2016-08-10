import _ from 'lodash';

export default function (baseConverter) {
  return {
    kibanaToEs: function (processorApiDocument) {
      const result = baseConverter.kibanaToEs(processorApiDocument, 'grok');
      _.assign(result.grok, {
        field: processorApiDocument.source_field,
        patterns: processorApiDocument.patterns,
        trace_match: processorApiDocument.trace_match
      });

      if (processorApiDocument.pattern_definitions.length > 0) {
        const definitions = {};
        _.forEach(processorApiDocument.pattern_definitions, (definition) => {
          if (definition.name && definition.value) {
            _.set(definitions, definition.name, definition.value);
          }
        });
        if (!_.isEmpty(definitions)) {
          result.grok.pattern_definitions = definitions;
        }
      }

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'grok');

      _.assign(result, {
        source_field: processorEsDocument.grok.field,
        patterns: processorEsDocument.grok.patterns,
        trace_match: processorEsDocument.trace_match,
        pattern_definitions: processorEsDocument.pattern_definitions
      });

      return result;
    }
  };
}
