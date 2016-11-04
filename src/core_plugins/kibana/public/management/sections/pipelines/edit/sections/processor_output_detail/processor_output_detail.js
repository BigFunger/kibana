import _ from 'lodash';
import uiModules from 'ui/modules';
import './processor_output_detail.less';
import template from './processor_output_detail.html';

const app = uiModules.get('kibana');

app.directive('processorOutputDetail', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      pipeline: '=',
      processorShell: '='
    },
    controller: function ($scope) {
      function updateInputs() {
        const processorShell = $scope.processorShell;

        $scope.title = `${processorShell.processor.title} ${processorShell.description}`;
        $scope.inputObject = processorShell.inputObject;
        $scope.outputObject = processorShell.outputObject;

        $scope.inputStatesDoc = {
          oldValue:  _.get($scope.inputObject, 'doc'),
          newValue: _.get($scope.inputObject, 'doc')
        };
        $scope.inputStatesMeta = {
          oldValue:  _.get($scope.inputObject, 'meta'),
          newValue: _.get($scope.inputObject, 'meta')
        };
        $scope.outputStatesDoc = {
          oldValue:  _.get($scope.inputObject, 'doc'),
          newValue: _.get($scope.outputObject, 'doc')
        };
        $scope.outputStatesMeta = {
          oldValue:  _.get($scope.inputObject, 'meta'),
          newValue: _.get($scope.outputObject, 'meta')
        };
      }

      $scope.$watch('processorShell', e => { updateInputs(); });
      $scope.$watch('pipeline.output', e => { updateInputs(); });

      $scope.inputSection = { collapsed: true };
      $scope.inputOptions = {
        document: {
          title: 'Document'
        },
        meta: {
          title: 'Metadata'
        }
      };
      $scope.currentInputOption = $scope.inputOptions.document;

      $scope.outputSection = { collapsed: false };
      $scope.outputOptions = {
        document: {
          title: 'Document'
        },
        meta: {
          title: 'Metadata'
        }
      };
      $scope.currentOutputOption = $scope.outputOptions.document;
    }
  };
});
