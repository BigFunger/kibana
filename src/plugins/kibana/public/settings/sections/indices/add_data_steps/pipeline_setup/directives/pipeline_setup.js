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

        pipeline.input = $scope.sample;
        pipeline.processorCollection.updateInputs(pipeline.input);
        pipeline.dirty = true;
      });

      $scope.$watch('processorTypeId', processorTypeId => {
        if (!processorTypeId) return;

        const pipeline = $scope.pipeline;

        pipeline.activeProcessorCollection.add(processorTypeId);
        $scope.processorTypeId = null;
      });

      $scope.$watch('pipeline.dirty', simulatePipeline);

      $scope.$watch('pipeline', (newPipeline) => {
        //TODO: Not sure what to do in this case... since the samples are going to be associated with a pipeline.
        const pipeline = $scope.pipeline;

        pipeline.input = $scope.sample;
        pipeline.processorCollection.updateInputs(pipeline.input);
        pipeline.dirty = true;
      });

      $scope.expandContext = 1;
    }
  };
});
