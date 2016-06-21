import uiModules from 'ui/modules';
import template from '../views/pipeline_failure_options.html';
import '../styles/_failure_options.less';

const app = uiModules.get('kibana');

app.directive('pipelineFailureOptions', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      pipeline: '='
    },
    controller: function ($scope) {
      const pipeline = $scope.pipeline;

      $scope.options = [
        { label: 'Do not index document', value: 'index_fail' },
        { label: 'Execute other processors', value: 'on_error' }
      ];

      $scope.defineFailureProcessors = () => {
        pipeline.pushProcessorCollection(pipeline.errorProcessorCollection);
      };
    }
  };
});
