import _ from 'lodash';
import handleESError from '../../../lib/handle_es_error';
import simulateSchema from '../../../lib/ingest/simulate/schema';
import simulateConverter from '../../../lib/ingest/simulate/converter';
import { keysToCamelCaseShallow, keysToSnakeCaseShallow } from '../../../../common/lib/case_conversion';

export function handleResponse(resp) {
  return simulateConverter.esResponseToKibana(resp);
};

export function handleError(error) {
  return simulateConverter.esErrorToKibana(error);
}

export function registerSimulate(server) {
  server.route({
    path: '/api/kibana/ingest/simulate',
    method: 'POST',
    config: {
      validate: {
        payload: simulateSchema
      }
    },
    handler: function (request, reply) {
      const boundCallWithRequest = _.partial(server.plugins.elasticsearch.callWithRequest, request);
      const simulateApiDocument = request.payload;
      const body = simulateConverter.kibanaToEs(simulateApiDocument);

      console.log(JSON.stringify(body));

      return boundCallWithRequest('transport.request', {
        path: '/_ingest/pipeline/_simulate',
        query: { verbose: true },
        method: 'POST',
        body: body
      })
      .then(handleResponse, handleError)
      .then((processors) => _.map(processors, keysToSnakeCaseShallow))
      .then(reply)
      .catch((error) => {
        reply(handleESError(error));
      });
    }
  });
};
