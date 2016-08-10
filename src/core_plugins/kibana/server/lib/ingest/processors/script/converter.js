import _ from 'lodash';

export default function (baseConverter) {
  return {
    kibanaToEs: function (processorApiDocument) {
      const result = baseConverter.kibanaToEs(processorApiDocument, 'script');
      _.assign(result.script, {
        field: processorApiDocument.target_field
      });

      if (!_.isEmpty(processorApiDocument.language)) {
        result.script.lang = processorApiDocument.language;
      }
      if (!_.isEmpty(processorApiDocument.filename)) {
        result.script.file = processorApiDocument.filename;
      }
      if (!_.isEmpty(processorApiDocument.script_id)) {
        result.script.id = processorApiDocument.script_id;
      }
      if (!_.isEmpty(processorApiDocument.inline_script)) {
        result.script.inline = processorApiDocument.inline_script;
      }

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'script');

      _.assign(result, {
        target_field: processorEsDocument.script.field,
        language: processorEsDocument.script.lang,
        filename: processorEsDocument.script.file,
        script_id: processorEsDocument.script.id,
        inline_script: processorEsDocument.script.inline
      });

      return result;
    }
  };
}
