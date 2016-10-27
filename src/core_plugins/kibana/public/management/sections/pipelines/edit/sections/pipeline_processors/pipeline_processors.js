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

      this.simulate = () => {
        const pipeline = $scope.pipeline;

        pipeline.input = pipeline.sampleCollection.samples[0].doc;

        return pipelines.pipeline.simulate(pipeline.model, pipeline.input)
        .then((results) => { pipeline.applySimulateResults(results); })
        .catch(notify.error);
      };
    }
  };
});
