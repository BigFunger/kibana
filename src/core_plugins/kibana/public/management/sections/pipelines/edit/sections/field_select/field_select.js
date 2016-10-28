import uiModules from 'ui/modules';
import { flow, union, compact } from 'lodash';
import template from './field_select.html';
import './field_select.less';
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
    link: function ($scope, $el, attr) {
      $timeout(() => {
        $el.find('.ui-select-toggle').removeClass('btn btn-default');
      });
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

app.directive('fieldSelectTweaks', function ($timeout) {
  return {
    restrict: 'A',
    link: function ($scope, $el) {
      $timeout(() => {
        $scope.$select.setFocus();
      });

      $scope.$watch('$select.open', function (isOpen) {
        if (isOpen) {
          $scope.$select.search = $scope.$select.selected;
        }
      });
    }
  };
});
