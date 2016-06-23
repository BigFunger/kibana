import { keysToCamelCaseShallow, keysToSnakeCaseShallow } from '../../../plugins/kibana/common/lib/case_conversion';
import _ from 'lodash';
import angular from 'angular';

export default function IngestProvider($rootScope, $http, config, $q) {

  const ingestAPIPrefix = '../api/kibana/ingest';

  function packProcessors(processors) {
    return _.map(processors, (processor) => {
      const result = keysToSnakeCaseShallow(processor);
      result.processors = packProcessors(processor.processors);

      return result;
    });
  }

  function packPipeline(pipeline) {
    const result = keysToSnakeCaseShallow(pipeline);
    result.processors = packProcessors(result.processors);
    if (result.error_processors) {
      result.error_processors = packProcessors(result.error_processors);
    }

    return result;
  }

  function unpackProcessors(processors) {
    return _.map(processors, (processor) => {
      const result = keysToCamelCaseShallow(processor);
      result.processors = packProcessors(processor.processors);

      return result;
    });
  }

  function unpackPipeline(pipeline) {
    const result = keysToCamelCaseShallow(pipeline);
    result.processors = unpackProcessors(result.processors);
    if (result.errorProcessors) {
      result.errorProcessors = unpackProcessors(result.errorProcessors);
    }

    return result;
  }

  this.pipeline = {
    save: function (pipeline) {
      return $http.put(`${ingestAPIPrefix}/pipeline`, packPipeline(pipeline))
      .catch(err => {
        return $q.reject(new Error('Error saving pipeline'));
      });
    },
    load: function (pipelineId) {
      function unpack(response) {
        return unpackPipeline(response.data);
      }

      return $http.get(`${ingestAPIPrefix}/pipeline/${pipelineId}`)
      .then(unpack)
      .catch(err => {
        return $q.reject(new Error('Error fetching pipeline'));
      });
    },
    delete: function () {

    }
  };

  this.pipelines = {
    load: function () {

    }
  };

  this.save = function (indexPattern, pipeline) {
    if (_.isEmpty(indexPattern)) {
      throw new Error('index pattern is required');
    }

    const payload = {
      index_pattern: keysToSnakeCaseShallow(indexPattern)
    };
    if (!_.isEmpty(pipeline)) {
      payload.pipeline = _.map(pipeline, processor => keysToSnakeCaseShallow(processor));
    }

    return $http.post(`${ingestAPIPrefix}`, payload)
    .then(() => {
      if (!config.get('defaultIndex')) {
        config.set('defaultIndex', indexPattern.id);
      }

      $rootScope.$broadcast('ingest:updated');
    });
  };

  this.delete = function (ingestId) {
    if (_.isEmpty(ingestId)) {
      throw new Error('ingest id is required');
    }

    return $http.delete(`${ingestAPIPrefix}/${ingestId}`)
    .then(() => {
      $rootScope.$broadcast('ingest:updated');
    });
  };

  this.simulate = function (pipeline, input) {
    function pack(pipeline, input) {
      const result = {
        pipeline: packPipeline(pipeline),
        input: input
      };

      return result;
    }

    function unpack(response) {
      const data = response.data.map(result => keysToCamelCaseShallow(result));
      return data;
    }

    const payload = pack(pipeline, input);
    return $http.post(`${ingestAPIPrefix}/simulate`, payload)
    .then(unpack)
    .catch(err => {
      return $q.reject(new Error('Error simulating pipeline'));
    });
  };

  this.getProcessors = function () {
    function unpack(response) {
      return response.data;
    }

    return $http.get(`${ingestAPIPrefix}/processors`)
    .then(unpack)
    .catch(err => {
      return $q.reject(new Error('Error fetching enabled processors'));
    });
  };

}
