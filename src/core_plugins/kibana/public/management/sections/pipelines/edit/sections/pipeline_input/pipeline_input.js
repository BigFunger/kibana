import uiModules from 'ui/modules';
import template from './pipeline_input.html';
import './pipeline_input.less';

const app = uiModules.get('kibana');

app.directive('pipelineInput', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      pipeline: '='
    },
    controller: function ($scope) {
      $scope.inputSection = {
        collapsed: true
      };
    }
  };
});
