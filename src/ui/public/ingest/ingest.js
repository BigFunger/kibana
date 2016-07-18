import RefreshKibanaIndexProvider from 'plugins/kibana/management/sections/indices/_refresh_kibana_index';
import { keysToCamelCaseShallow, keysToSnakeCaseShallow } from '../../../core_plugins/kibana/common/lib/case_conversion';
import _ from 'lodash';
import angular from 'angular';
import chrome from 'ui/chrome';

export default function IngestProvider($rootScope, $http, config, $q, Private, indexPatterns) {

  const ingestAPIPrefix = chrome.addBasePath('/api/kibana/ingest');
  const refreshKibanaIndex = Private(RefreshKibanaIndexProvider);

  function packProcessors(processors) {
    return _.map(processors, (processor) => {
      const result = keysToSnakeCaseShallow(processor);
      result.failure_processors = packProcessors(result.failure_processors);
      if (result.processors) {
        result.processors = packProcessors(result.processors); //for the foreach processor
      }

      return result;
    });
  }

  function packPipeline(pipeline) {
    const result = keysToSnakeCaseShallow(pipeline);
    result.processors = packProcessors(result.processors);
    if (result.failure_processors) {
      result.failure_processors = packProcessors(result.failure_processors);
    }

    return result;
  }

  function unpackProcessors(processors) {
    return _.map(processors, (processor) => {
      const result = keysToCamelCaseShallow(processor);
      result.failureProcessors = unpackProcessors(result.failureProcessors);
      if (result.processors) {
        result.processors = unpackProcessors(result.processors); //for the foreach processor
      }

      return result;
    });
  }

  function unpackPipeline(pipeline) {
    const result = keysToCamelCaseShallow(pipeline);
    result.processors = unpackProcessors(result.processors);
    if (result.failureProcessors) {
      result.failureProcessors = unpackProcessors(result.failureProcessors);
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
        const result = unpackPipeline(response.data);
        return result;
      }

      return $http.get(`${ingestAPIPrefix}/pipeline/${pipelineId}`)
      .then(unpack)
      .catch(err => {
        return $q.reject(new Error('Error fetching pipeline'));
      });
    },
    delete: function (pipelineId) {
      if (_.isEmpty(pipelineId)) {
        throw new Error('pipeline id is required');
      }

      return $http.delete(`${ingestAPIPrefix}/pipeline/${pipelineId}`);
    }
  };

  this.pipelines = {
    load: function () {
      function unpack(response) {
        return _.map(response.data, (pipeline) => {
          return unpackPipeline(pipeline);
        });
      }

      return $http.get(`${ingestAPIPrefix}/pipelines`)
      .then(unpack)
      .catch(err => {
        return $q.reject(new Error('Error fetching pipelines'));
      });
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

      indexPatterns.getIds.clearCache();
      $rootScope.$broadcast('ingest:updated');
    });
  };

  this.delete = function (ingestId) {
    if (_.isEmpty(ingestId)) {
      throw new Error('ingest id is required');
    }

    return $http.delete(`${ingestAPIPrefix}/${ingestId}`)
    .then(() => {
      indexPatterns.getIds.clearCache();
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
      // console.log('simulate result', data);
      return data;
    }

    const payload = pack(pipeline, input);
    //console.log('simulate request', payload);
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

  this.uploadCSV = function (file, indexPattern, delimiter, pipeline) {
    if (_.isUndefined(file)) {
      throw new Error('file is required');
    }
    if (_.isUndefined(indexPattern)) {
      throw new Error('index pattern is required');
    }

    const formData = new FormData();
    formData.append('csv', file);

    const params = {};
    if (!_.isUndefined(delimiter)) {
      params.csv_delimiter = delimiter;
    }
    if (!_.isUndefined(pipeline)) {
      params.pipeline = pipeline;
    }

    return $http.post(chrome.addBasePath(`/api/kibana/${indexPattern}/_data`), formData, {
      params: params,
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    });
  };

}
