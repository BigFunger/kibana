import _ from 'lodash';

export default function (baseConverter) {
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
      _.assign(result.convert, {
        field: processorApiDocument.source_field,
        type: types[processorApiDocument.type],
      });
      if (!_.isEmpty(processorApiDocument.target_field)) {
        result.convert.target_field = processorApiDocument.target_field;
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

      _.assign(result, {
        source_field: processorEsDocument.convert.field,
        target_field: processorEsDocument.convert.target_field,
        type: types[processorEsDocument.convert.type]
      });

      return result;
    }
  };
}
