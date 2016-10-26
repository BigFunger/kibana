import { assign, isEmpty } from 'lodash';

export default function (server) {
  const baseConverter = server.plugins.kibana.pipelines.processors.baseConverter;

  return {
    kibanaToEs: function (processorApiDocument) {
      const result = baseConverter.kibanaToEs(processorApiDocument, 'trim');
      assign(result.trim, {
        field: processorApiDocument.field
      });

      if (!isEmpty(processorApiDocument.ignore_missing)) {
        assign(result.trim, {
          ignore_missing: processorApiDocument.ignore_missing
        });
      }

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'trim');

      assign(result, {
        field: processorEsDocument.trim.field
      });

      if (!isEmpty(processorEsDocument.trim.ignore_missing)) {
        assign(result, {
          ignore_missing: processorEsDocument.trim.ignore_missing
        });
      }

      return result;
    }
  };
}
