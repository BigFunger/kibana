import uiModules from 'ui/modules';
import _ from 'lodash';
import Pipeline from '../lib/pipeline';
import angular from 'angular';
import IngestProvider from 'ui/ingest';
import '../styles/_pipeline_setup.less';
import template from '../views/pipeline_setup.html';
import ProcessorCollection from '../lib/processor_collection';

const app = uiModules.get('kibana');

app.directive('pipelineSetup', function () {
  return {
    restrict: 'E',
    template: template,
    controller: function ($scope, $route, debounce, Private, Notifier) {
      const ingest = Private(IngestProvider);
      const notify = new Notifier({ location: `Ingest Pipeline Setup` });
      $scope.collectionTypes = ProcessorCollection.types;

      $scope.pipeline = $route.current.locals.pipeline;

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
        pipeline.dirty = true;
      });

      $scope.$watch('pipeline.input', (newVal) => {
        const pipeline = $scope.pipeline;
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
        const pipeline = $scope.pipeline;
        pipeline.dirty = true;

        window.pipeline = $scope.pipeline;
      });

      $scope.expandContext = 1;
    }
  };
});
