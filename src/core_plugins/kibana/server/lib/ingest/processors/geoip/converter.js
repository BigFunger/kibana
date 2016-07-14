import _ from 'lodash';
import baseConverter from '../base/converter';

export default {
  kibanaToEs: function (processorApiDocument) {
    const result = baseConverter.kibanaToEs(processorApiDocument, 'geoip');
    _.assign(result.geoip, {
      field: processorApiDocument.source_field
    });
    if (!_.isEmpty(processorApiDocument.target_field)) {
      result.geoip.target_field = processorApiDocument.target_field;
    }
    if (!_.isEmpty(processorApiDocument.database_file)) {
      result.geoip.database_file = processorApiDocument.database_file;
    }
    if (!_.isEmpty(processorApiDocument.database_fields)) {
      result.geoip.properties = processorApiDocument.database_fields;
    }

    return result;
  },
  esToKibana: function (processorEsDocument) {
    const result = baseConverter.esToKibana(processorEsDocument, 'geoip');

    _.assign(result, {
      source_field: processorEsDocument.geoip.field,
      target_field: processorEsDocument.geoip.target_field,
      database_file: processorEsDocument.geoip.database_file,
      database_fields: processorEsDocument.geoip.properties
    });

    return result;
  }
};
