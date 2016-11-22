import { assign, isEmpty } from 'lodash';

export default function (server) {
  const baseConverter = server.plugins.pipelines.processors.baseConverter;

  return {
    kibanaToEs: function (processorApiDocument) {
      const result = baseConverter.kibanaToEs(processorApiDocument, 'sort');
      assign(result.sort, {
        field: processorApiDocument.field
      });

      if (!isEmpty(processorApiDocument.sort_order)) {
        assign(result.sort, {
          order: processorApiDocument.sort_order
        });
      }

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'sort');

      assign(result, {
        field: processorEsDocument.sort.field
      });

      if (!isEmpty(processorEsDocument.sort.order)) {
        assign(result, {
          sort_order: processorEsDocument.sort.order
        });
      }

      return result;
    }
  };
}
