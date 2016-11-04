import modules from 'ui/modules';
import template from './secondary_nav.html';
import './secondary_nav.less';

const app = modules.get('apps/management');

app.directive('secondaryNav', function () {
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
