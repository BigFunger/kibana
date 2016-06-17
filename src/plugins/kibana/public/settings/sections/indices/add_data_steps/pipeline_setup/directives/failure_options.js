import uiModules from 'ui/modules';
import template from '../views/failure_options.html';
import '../styles/_failure_options.less';

const app = uiModules.get('kibana');

app.directive('failureOptions', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      value: '='
    },
    controller: function ($scope) {
      $scope.options = [
        { label: 'Ignore, and index document', value: 'ignore_error' },
        { label: 'Do not index document', value: 'index_fail' },
        { label: 'Execute other processors', value: 'on_error' }
      ];
    }
  };
});
