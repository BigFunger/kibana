import { assign, isEmpty, has } from 'lodash';

export default function (server) {
  const baseConverter = server.plugins.kibana.pipelines.processors.baseConverter;

  return {
    kibanaToEs: function (processorApiDocument) {
      const types = {
        //<kibana type>: <ingest type>,
        auto: 'auto',
        number: 'float',
        string: 'string',
        boolean: 'boolean'
      };

      const result = baseConverter.kibanaToEs(processorApiDocument, 'convert');
      assign(result.convert, {
        field: processorApiDocument.field,
        type: types[processorApiDocument.type],
        ignore_missing: processorApiDocument.ignore_missing
      });

      if (!isEmpty(processorApiDocument.target_field)) {
        assign(result.convert, {
          target_field: processorApiDocument.target_field
        });
      }

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'convert');

      const types = {
        //<ingest type>: <kibana type>
        auto: 'auto',
        double: 'number',
        float: 'number',
        integer: 'number',
        long: 'number',
        short: 'number',
        string: 'string',
        boolean: 'boolean'
      };

      assign(result, {
        field: processorEsDocument.convert.field,
        type: types[processorEsDocument.convert.type],
        ignore_missing: processorEsDocument.convert.ignore_missing
      });

      if (!isEmpty(processorEsDocument.convert.target_field)) {
        assign(result, {
          target_field: processorEsDocument.convert.target_field
        });
      }

      if (!has(processorEsDocument.convert, 'ignore_missing')) {
        result.ignore_missing = false;
      }

      return result;
    }
  };
}
