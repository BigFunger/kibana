import { assign, forEach, set, isEmpty, keys, has } from 'lodash';

export default function (server) {
  const baseConverter = server.plugins.kibana.pipelines.processors.baseConverter;

  return {
    kibanaToEs: function (processorApiDocument) {
      const result = baseConverter.kibanaToEs(processorApiDocument, 'grok');
      assign(result.grok, {
        field: processorApiDocument.field,
        patterns: processorApiDocument.patterns,
        trace_match: processorApiDocument.trace_match,
        ignore_missing: processorApiDocument.ignore_missing
      });

      if (processorApiDocument.pattern_definitions.length > 0) {
        const definitions = {};
        forEach(processorApiDocument.pattern_definitions, (definition) => {
          if (definition.name && definition.value) {
            set(definitions, definition.name, definition.value);
          }
        });

        if (!isEmpty(definitions)) {
          assign(result.grok, {
            pattern_definitions: definitions
          });
        }
      }

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'grok');

      assign(result, {
        field: processorEsDocument.grok.field,
        patterns: processorEsDocument.grok.patterns,
        trace_match: processorEsDocument.grok.trace_match,
        ignore_missing: processorEsDocument.grok.ignore_missing
      });

      if (!isEmpty(processorEsDocument.grok.pattern_definitions)) {
        const esDefinitions = processorEsDocument.grok.pattern_definitions;
        const patternDefinitions = [];
        forEach(keys(esDefinitions), (key) => {
          patternDefinitions.push({ name: key, value: esDefinitions[key] });
        });

        assign(result, {
          pattern_definitions: patternDefinitions
        });
      }

      if (!has(processorEsDocument.grok, 'ignore_missing')) {
        result.ignore_missing = false;
      }

      if (!has(processorEsDocument.grok, 'trace_match')) {
        result.trace_match = false;
      }

      return result;
    }
  };
}
