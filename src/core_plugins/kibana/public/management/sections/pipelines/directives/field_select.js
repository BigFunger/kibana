import uiModules from 'ui/modules';
import _ from 'lodash';
import '../styles/_field_select.less';
import template from '../views/field_select.html';
import 'ui-select';

const app = uiModules.get('kibana');

app.directive('fieldSelect', function ($timeout) {
  return {
    restrict: 'E',
    template: template,
    scope: {
      processor: '=',
      field: '='
    },
    controller: function ($scope) {
      $scope.selected = { value: $scope.field };

      $scope.$watch('processor.suggestedFields', () => {
        $scope.fields = $scope.processor.suggestedFields;
      });

      $scope.$watch('selected.value', (newVal) => {
        $scope.field = newVal;
      });

      $scope.union = _.flow(_.union, _.compact);
    }
  };
});
