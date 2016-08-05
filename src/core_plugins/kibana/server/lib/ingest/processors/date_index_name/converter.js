import _ from 'lodash';
import baseConverter from '../base/converter';

export default {
  kibanaToEs: function (processorApiDocument) {
    const result = baseConverter.kibanaToEs(processorApiDocument, 'date_index_name');
    _.assign(result.date_index_name, {
      field: processorApiDocument.source_field,
      date_rounding: processorApiDocument.date_rounding
    });

    const formats = _.compact(processorApiDocument.date_formats);
    if (!_.isEmpty(formats)) {
      result.date_index_name.date_formats = formats;
    }

    if (!_.isEmpty(processorApiDocument.index_name_prefix)) {
      result.date_index_name.index_name_prefix = processorApiDocument.index_name_prefix;
    }
    if (!_.isEmpty(processorApiDocument.timezone)) {
      result.date_index_name.timezone = processorApiDocument.timezone;
    }
    if (!_.isEmpty(processorApiDocument.locale)) {
      result.date_index_name.locale = processorApiDocument.locale;
    }
    if (!_.isEmpty(processorApiDocument.index_name_format)) {
      result.date_index_name.index_name_format = processorApiDocument.index_name_format;
    }

    return result;
  },
  esToKibana: function (processorEsDocument) {
    const result = baseConverter.esToKibana(processorEsDocument, 'date_index_name');

    _.assign(result, {
      source_field: processorEsDocument.date_index_name.field,
      date_rounding: processorEsDocument.date_index_name.date_rounding
    });

    if (!_.isEmpty(processorEsDocument.date_index_name.date_formats)) {
      result.date_formats = processorEsDocument.date_index_name.date_formats;
    }
    if (!_.isEmpty(processorEsDocument.date_index_name.index_name_prefix)) {
      result.index_name_prefix = processorEsDocument.date_index_name.index_name_prefix;
    }
    if (!_.isEmpty(processorEsDocument.date_index_name.timezone)) {
      result.timezone = processorEsDocument.date_index_name.timezone;
    }
    if (!_.isEmpty(processorEsDocument.date_index_name.locale)) {
      result.locale = processorEsDocument.date_index_name.locale;
    }
    if (!_.isEmpty(processorEsDocument.date_index_name.index_name_format)) {
      result.index_name_format = processorEsDocument.date_index_name.index_name_format;
    }

    return result;
  }
};
