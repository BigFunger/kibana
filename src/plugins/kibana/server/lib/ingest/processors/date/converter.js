import _ from 'lodash';
import baseConverter from '../base/converter';

export default {
  kibanaToEs: function (processorApiDocument) {
    const formats = [];
    processorApiDocument.formats.forEach((format) => {
      if (format.toUpperCase() === 'CUSTOM') {
        if (processorApiDocument.custom_format) {
          formats.push(processorApiDocument.custom_format);
        }
      } else {
        formats.push(format);
      }
    });

    const result = baseConverter.kibanaToEs(processorApiDocument, 'date');
    _.assign(result.date, {
      field: processorApiDocument.source_field,
      target_field: processorApiDocument.target_field,
      formats: formats,
      timezone: processorApiDocument.timezone,
      locale: processorApiDocument.locale
    });

    return result;
  },
  esToKibana: function (processorEsDocument) {
    const result = baseConverter.esToKibana(processorEsDocument, 'date');

    const standardFormats = ['ISO8601', 'UNIX', 'UNIX_MS', 'TAI64N'];

    const formats = [];
    let customFormat = '';
    _.forEach(processorEsDocument.date.formats, (format) => {
      if (_.contains(standardFormats, format.toUpperCase())) {
        formats.push(format.toUpperCase());
      } else {
        formats.push('CUSTOM');
        customFormat = format;
      }
    });

    _.assign(result, {
      source_field: processorEsDocument.date.field,
      target_field: processorEsDocument.date.target_field,
      formats: _.uniq(formats),
      custom_format: customFormat,
      timezone: processorEsDocument.date.timezone,
      locale: processorEsDocument.date.locale
    });

    return result;
  }
};
