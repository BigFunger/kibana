import _ from 'lodash';
import pipelineSchema from '../../../lib/ingest/pipeline/schema';
import pipelineConverter from '../../../lib/ingest/pipeline/converter';
import handleESError from '../../../lib/handle_es_error';

export function registerPipeline(server) {
  server.route({
    path: '/api/kibana/ingest/pipeline',
    method: 'PUT',
    config: {
      validate: {
        payload: pipelineSchema
      }
    },
    handler: function (request, reply) {
      const boundCallWithRequest = _.partial(server.plugins.elasticsearch.callWithRequest, request);
      const pipelineApiDocument = request.payload;
      const body = pipelineConverter.kibanaToEs(pipelineApiDocument);

      return boundCallWithRequest('transport.request', {
        path: `/_ingest/pipeline/${pipelineApiDocument.pipeline_id}`,
        method: 'PUT',
        body: body
      })
      .then(reply)
      .catch((error) => {
        reply(handleESError(error));
      });
    }
  });

  function handlePipelineResponse(response) {
    const esPipeline =  _.get(response, 'pipelines[0]');
    const kibanaPipeline = pipelineConverter.esToKibana(esPipeline);
    return kibanaPipeline;
  }

  server.route({
    path: '/api/kibana/ingest/pipeline/{id}',
    method: 'GET',
    handler: function (request, reply) {
      const boundCallWithRequest = _.partial(server.plugins.elasticsearch.callWithRequest, request);

      return boundCallWithRequest('transport.request', {
        path: `/_ingest/pipeline/${request.params.id}`,
        method: 'GET'
      })
      .then(handlePipelineResponse)
      .then(reply)
      .catch((error) => {
        reply(handleESError(error));
      });
    }
  });
};
