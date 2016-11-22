import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './processor_input.html';
import './processor_input.less';

const app = uiModules.get('pipelines');

app.directive('processorInput', function () {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'processorInput',
    controller: function ($scope) {
      $scope.$watch('processorShell.inputObject', () => {
        this.docStates = {
          oldValue:  _.get($scope.processorShell, 'inputObject.doc'),
          newValue: _.get($scope.processorShell, 'inputObject.doc')
        };
        this.metaStates = {
          oldValue:  _.get($scope.processorShell, 'inputObject.meta'),
          newValue: _.get($scope.processorShell, 'inputObject.meta')
        };
      });
    }
  };
});
