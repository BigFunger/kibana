import uiModules from 'ui/modules';
import template from './processor_input.html';
import './processor_input.less';

const app = uiModules.get('kibana');

app.directive('processorInput', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      processorShell: '='
    },
    controller: function ($scope) {
      $scope.collapsed = true;
    }
  };
});
