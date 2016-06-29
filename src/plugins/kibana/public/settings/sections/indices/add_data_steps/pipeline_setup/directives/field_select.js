import uiModules from 'ui/modules';
import _ from 'lodash';
import template from '../views/field_select.html';
import IngestProvider from 'ui/ingest';
import 'ui-select';

const app = uiModules.get('kibana');

app.directive('fieldSelect', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      field: '=',
      fields: '='
    },
    controller: function ($scope) {
      $scope.selectedItem = { value: '' };
      $scope.$watch('selectedItem.value', (newVal) => {
        if (!newVal) return;

        $scope.field = newVal;
      });

      $scope.fieldAdded = function (newField) {
        $scope.fields.push(newField);

        return newField;
      };
    }
  };
});
