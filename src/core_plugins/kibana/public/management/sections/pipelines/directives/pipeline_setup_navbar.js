import uiModules from 'ui/modules';
import template from '../views/pipeline_setup_navbar.html';
import '../styles/pipeline_setup_navbar.less';
import PipelinesProvider from 'ui/pipelines';

const app = uiModules.get('kibana');

app.directive('pipelineSetupNavbar', function () {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'sidebar',
    controller: function ($scope, Private, Notifier) {
      const pipelines = Private(PipelinesProvider);
      const notify = new Notifier({ location: `Pipeline Setup` });

      this.showData = true;
      this.section = 'processors';

      this.jumpToProcessor = () => {
        $scope.pipeline.showJumpToProcessor = !$scope.pipeline.showJumpToProcessor;
      };

      this.simulate = () => {
        const pipeline = $scope.pipeline;

        // if (pipeline.processorCollection.processors.length === 0) {
        //   pipeline.updateOutput();
        //   return;
        // }
        // if (pipeline.sampleCollection.samples.length === 0) {
        //   pipeline.updateOutput();
        //   return;
        // }

        return pipelines.pipeline.simulate(pipeline.model, pipeline.input)
        .then((results) => { pipeline.applySimulateResults(results); })
        .catch(notify.error);
      };
    }
  };
});
