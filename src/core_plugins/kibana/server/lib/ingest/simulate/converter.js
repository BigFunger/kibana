import _ from 'lodash';
import ingestPipelineConverter from '../pipeline/converter';

export default {
  kibanaToEs: function (simulateApiDocument) {
    return {
      pipeline: ingestPipelineConverter.kibanaToEs(simulateApiDocument.pipeline),
      docs: [
        {
          _source: simulateApiDocument.input
        }
      ]
    };
  },
  esResponseToKibana: function (simulateEsDocument) {
    const processorResults = _.get(simulateEsDocument, 'docs[0].processor_results');
    const results = processorResults.map((processorResult) => {
      let processorError;
      const errorMessage =
        _.get(processorResult, 'error.root_cause[0].reason') ||
        _.get(processorResult, 'error.root_cause[0].type') ||
        _.get(processorResult, 'ignored_error.error.root_cause[0].reason') ||
        _.get(processorResult, 'ignored_error.error.root_cause[0].type');

      if (errorMessage) {
        processorError = {
          compile: false,
          message: errorMessage
        };
      }

      return {
        processorId: _.get(processorResult, 'tag'),
        output: _.get(processorResult, 'doc._source'),
        //ingestMeta: _.get(processorResult, 'doc._ingest'),
        ingestMeta: {
          '_index': _.get(processorResult, 'doc._index'),
          '_id': _.get(processorResult, 'doc._id'),
          '_type': _.get(processorResult, 'doc._type'),
          '_routing': _.get(processorResult, 'doc._routing'),
          '_parent': _.get(processorResult, 'doc._parent'),
          '_timestamp': _.get(processorResult, 'doc._timestamp'),
          '_ttl': _.get(processorResult, 'doc._ttl'),
          '_ingest': _.get(processorResult, 'doc._ingest')
        },
        error: processorError
      };
    });

    return results;
  },
  esErrorToKibana: function (simulateEsDocument) {
    const processorId = _.get(simulateEsDocument, 'body.error.root_cause[0].header.processor_tag');
    if (!processorId) throw simulateEsDocument;

    const errorMessage = _.get(simulateEsDocument, 'body.error.root_cause[0].reason');
    const processorError = {
      compile: true,
      message: errorMessage
    };

    const results = [
      {
        processorId: processorId,
        error: processorError
      }
    ];

    return results;
  }
};
