import _ from 'lodash';
import baseConverter from '../base/converter';

export default {
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
    if (!_.has(processorEsDocument, 'convert')) {
      throw new Error('Elasticsearch processor document missing [convert] property');
    }

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

    return {
      typeId: 'convert',
      processor_id: processorEsDocument.convert.tag,
      source_field: processorEsDocument.convert.field,
      target_field: processorEsDocument.convert.target_field,
      type: types[processorEsDocument.convert.type],
      ignore_failure: processorEsDocument.convert.ignore_failure
    };
  }
};
