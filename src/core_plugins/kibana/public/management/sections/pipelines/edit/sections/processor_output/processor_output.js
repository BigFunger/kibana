import _ from 'lodash';
import uiModules from 'ui/modules';
import jsondiffpatch from '@bigfunger/jsondiffpatch';
import './processor_output.less';
import template from './processor_output.html';

const htmlFormat = jsondiffpatch.formatters.html.format;

const app = uiModules.get('kibana');

app.directive('processorOutput', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      processorShell: '='
    },
    controller: function ($scope) {

      $scope.outputOptions = {
        document: {
          title: 'Document'
        },
        meta: {
          title: 'Metadata'
        }
      };
      $scope.currentOutputOption = $scope.outputOptions.document;

      $scope.onlyShowChanges = true;

      $scope.$watch('processorShell.outputObject', () => {
        const processorShell = $scope.processorShell;

        $scope.docStates = {
          oldValue: _.get(processorShell.inputObject, 'doc'),
          newValue: _.get(processorShell.outputObject, 'doc')
        };
        $scope.metaStates = {
          oldValue: _.get(processorShell.inputObject, 'meta'),
          newValue: _.get(processorShell.outputObject, 'meta')
        };
      });
    }
  };
});
