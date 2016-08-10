import _ from 'lodash';

export default function (baseConverter) {
  return {
    kibanaToEs: function (processorApiDocument) {
      const result = baseConverter.kibanaToEs(processorApiDocument, 'sort');
      _.assign(result.sort, {
        field: processorApiDocument.target_field,
        order: processorApiDocument.sort_order
      });

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'sort');

      _.assign(result, {
        target_field: processorEsDocument.sort.field,
        sort_order: processorEsDocument.sort.order
      });

      return result;
    }
  };
}
