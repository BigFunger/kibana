import uiModules from 'ui/modules';
import _ from 'lodash';
import Pipeline from '../lib/pipeline';
import angular from 'angular';
import IngestProvider from 'ui/ingest';
import '../styles/_pipeline_setup.less';
import template from '../views/pipeline_setup.html';

const app = uiModules.get('kibana');

app.directive('pipelineSetup', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      samples: '=',
      pipelineModel: '='
    },
    controller: function ($scope, debounce, Private, Notifier) {
      const ingest = Private(IngestProvider);
      const notify = new Notifier({ location: `Ingest Pipeline Setup` });
      $scope.sample = {};

      $scope.pipeline = new Pipeline($scope.pipelineModel);
      window.pipeline = $scope.pipeline;

      //initiates the simulate call if the pipeline is dirty
      const simulatePipeline = debounce((event, message) => {
        const pipeline = $scope.pipeline;

        if (pipeline.processorCollection.processors.length === 0) {
          pipeline.updateOutput();
          return;
        }

        return ingest.simulate(pipeline.model, pipeline.input)
        .then((results) => { pipeline.applySimulateResults(results); })
        .catch(notify.error);
      }, 200);

      $scope.$watchCollection('pipeline.activeProcessorCollection.processors', (newVal, oldVal) => {
        const pipeline = $scope.pipeline;

        pipeline.activeProcessorCollection.updateParents();
        pipeline.dirty = true;
      });

      $scope.$watch('sample', (newVal) => {
        const pipeline = $scope.pipeline;

        //TODO: (need to make sure that updateParents is recursive.)
        pipeline.input = $scope.sample;
        pipeline.processorCollection.updateParents(pipeline.input);
        pipeline.dirty = true;
      });

      $scope.$watch('processorType', processorType => {
        if (!processorType) return;

        const pipeline = $scope.pipeline;

        pipeline.activeProcessorCollection.add(processorType.id);
        $scope.processorType = null;
      });

      $scope.$watch('pipeline.dirty', simulatePipeline);

      $scope.expandContext = 1;
    }
  };
});
