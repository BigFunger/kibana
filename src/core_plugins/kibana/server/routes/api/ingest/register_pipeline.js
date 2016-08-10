import _ from 'lodash';
import pipelineSchema from '../../../lib/ingest/pipeline/schema';
import pipelineConverterProvider from '../../../lib/ingest/pipeline/converter';
import handleESError from '../../../lib/handle_es_error';

export function registerPipeline(server) {
  const kibana = server.plugins.kibana;
  const ingestManager = kibana.ingest;
  const pipelineConverter = pipelineConverterProvider(server);

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
      const kibanaIndex = server.config().get('kibana.index');

      return boundCallWithRequest('transport.request', {
        path: `/_ingest/pipeline/${pipelineApiDocument.pipeline_id}`,
        method: 'PUT',
        body: body
      })
      .then(boundCallWithRequest('index', {
        index: kibanaIndex,
        type: 'pipeline-meta',
        id: pipelineApiDocument.pipeline_id,
        body: {
          'raw-samples': pipelineApiDocument.raw_samples,
        }
      }))
      .then(reply)
      .catch((error) => {
        reply(handleESError(error));
      });
    }
  });

  function handlePipelineResponse(response, metaResponse) {
    const kibanaPipeline = pipelineConverter.esToKibana(response);

    kibanaPipeline.raw_samples = metaResponse._source['raw-samples'];
    return kibanaPipeline;
  }

  server.route({
    path: '/api/kibana/ingest/pipeline/{id}',
    method: 'GET',
    handler: function (request, reply) {
      const boundCallWithRequest = _.partial(server.plugins.elasticsearch.callWithRequest, request);
      const kibanaIndex = server.config().get('kibana.index');

      return boundCallWithRequest('transport.request', {
        path: `/_ingest/pipeline/${request.params.id}`,
        method: 'GET'
      })
      .then((response) => {
        return boundCallWithRequest('get', {
          index: kibanaIndex,
          type: 'pipeline-meta',
          id: request.params.id
        })
        .then(_.partial(handlePipelineResponse, response));
      })
      .then(reply)
      .catch((error) => {
        reply(handleESError(error));
      });
    }
  });

  server.route({
    path: '/api/kibana/ingest/pipeline/{id}',
    method: 'DELETE',
    handler: function (request, reply) {
      const boundCallWithRequest = _.partial(server.plugins.elasticsearch.callWithRequest, request);
      const kibanaIndex = server.config().get('kibana.index');

      return boundCallWithRequest('transport.request', {
        path: `/_ingest/pipeline/${request.params.id}`,
        method: 'DELETE'
      })
      .then(reply)
      .catch((error) => {
        reply(handleESError(error));
      });
    }
  });
};
