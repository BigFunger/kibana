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
      $scope.inputOptions = {
        document: {
          title: 'Document'
        },
        meta: {
          title: 'Metadata'
        }
      };
      $scope.currentInputOption = $scope.inputOptions.document;
    }
  };
});
