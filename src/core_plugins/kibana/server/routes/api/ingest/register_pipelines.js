import _ from 'lodash';
import pipelineConverter from '../../../lib/ingest/pipeline/converter';
import handleESError from '../../../lib/handle_es_error';

export function registerPipelines(server) {
  function handleResponse(response) {
    const result =  _.map(response.pipelines, (esPipeline) => {
      return pipelineConverter.esToKibana(esPipeline);
    });

    return result;
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
      .then(handleResponse)
      .then(reply)
      .catch((error) => {
        reply(handleESError(error));
      });
    }
  });
};
