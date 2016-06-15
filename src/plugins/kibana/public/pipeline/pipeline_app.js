import uiModules from 'ui/modules';
import template from './pipeline_app.html';
const app = uiModules.get('kibana');

app.directive('pipelineApp', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      samples: '=',
      pipeline: '='
    },
    controller: function ($scope) {
      $scope.samples = [
        { message: 'item1' },
        { message: 'item2' }
      ];
    }
  };
});
