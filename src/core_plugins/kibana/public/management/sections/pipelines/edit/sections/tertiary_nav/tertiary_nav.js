import modules from 'ui/modules';
import template from './tertiary_nav.html';
import './tertiary_nav.less';

const app = modules.get('apps/management');

app.directive('tertiaryNav', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      options: '=',
      selectedOption: '='
    },
    controller: function ($scope) {
      $scope.selected = {
        value: $scope.selectedOption
      };

      $scope.$watch('selected.value', (newVal) => {
        $scope.selectedOption = newVal;
      });
    }
  };
});
