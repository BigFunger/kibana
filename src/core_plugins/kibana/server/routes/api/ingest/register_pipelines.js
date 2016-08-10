import _ from 'lodash';
import pipelineConverter from '../../../lib/ingest/pipeline/converter';
import handleESError from '../../../lib/handle_es_error';

export function registerPipelines(server) {
  const kibana = server.plugins.kibana;
  const ingestManager = kibana.ingest;

  function handleResponse(response) {
    console.log('register_pipelines.handleResponse', response);
    console.log(ingestManager);

    const result = [];
    _.forIn(response, (esPipelineDetails, pipelineId) => {
      const esPipeline = _.set({}, pipelineId, esPipelineDetails);
      result.push(pipelineConverter.esToKibana(esPipeline, ingestManager));
    });

    return result;
  }

  function handleError(error) {
    if (error.status === 404) {
      return [];
    } else {
      throw error;
    }
  }

  server.route({
    path: '/api/kibana/ingest/pipelines',
    method: 'GET',
    handler: function (request, reply) {
      const boundCallWithRequest = _.partial(server.plugins.elasticsearch.callWithRequest, request);
      const kibanaIndex = server.config().get('kibana.index');

      return boundCallWithRequest('transport.request', {
        path: `/_ingest/pipeline/*`,
        method: 'GET'
      })
      .then(handleResponse, handleError)
      .then(reply)
      .catch((error) => {
        reply(handleESError(error));
      });
    }
  });
};
