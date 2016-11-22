import uiModules from 'ui/modules';
import template from './script_parameters.html';
import './script_parameters.less';

const app = uiModules.get('pipelines');

app.directive('scriptParameters', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      parameters: '=',
      onChange: '&'
    },
    controller : function ($scope) {
      if ($scope.parameters.length === 0) {
        $scope.parameters.push({});
      }
    }
  };
});
