import uiModules from 'ui/modules';
import { flow, union, compact } from 'lodash';
import template from './field_select.html';
import './field_select.less';
import 'ui-select';

const app = uiModules.get('pipelines');

app.directive('fieldSelect', function ($timeout) {
  return {
    restrict: 'E',
    template: template,
    scope: {
      processor: '=',
      field: '=',
      name: '@'
    },
    controller: function ($scope) {
      $scope.selected = { value: $scope.field };

      $scope.$watch('processor.processorShell.suggestedFields', (suggestedFields) => {
        $scope.fields = (suggestedFields || []).sort();
      });

      $scope.$watch('selected.value', (newVal) => {
        $scope.field = newVal;
      });

      $scope.union = flow(union, compact);
    }
  };
});
