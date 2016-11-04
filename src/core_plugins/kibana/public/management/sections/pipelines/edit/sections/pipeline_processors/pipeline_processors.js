import _ from 'lodash';
import modules from 'ui/modules';
import template from './pipeline_processors.html';
import './pipeline_processors.less';
import PipelinesProvider from 'ui/pipelines';

const app = modules.get('apps/management');

app.directive('pipelineProcessors', function () {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'pipelineProcessors',
    controller: function ($scope, Private, Notifier) {
      const pipelines = Private(PipelinesProvider);
      const notify = new Notifier({ location: `Pipeline Setup` });

      this.selectedItem = _.first($scope.pipeline.processorCollection.processors);

      this.simulate = () => {
        const pipeline = $scope.pipeline;
        if (!pipeline.sampleCollection.getCurrentSample()) return;

        return pipelines.pipeline.simulate(pipeline.model)
        .then((results) => { pipeline.applySimulateResults(results); })
        .catch(notify.error);
      };

      $scope.$watch('pipeline.sampleCollection.index', () => {
        this.simulate();
      });
    }
  };
});
