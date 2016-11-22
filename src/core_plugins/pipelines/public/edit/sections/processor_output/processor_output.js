import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './processor_output.html';
import './processor_output.less';

const app = uiModules.get('pipelines');

app.directive('processorOutput', function () {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'processorOutput',
    controller: function ($scope) {
      this.onlyShowChanges = true;

      $scope.$watch('processorShell.outputObject', () => {
        this.docStates = {
          oldValue: _.get($scope.processorShell, 'inputObject.doc'),
          newValue: _.get($scope.processorShell, 'outputObject.doc')
        };
        this.metaStates = {
          oldValue: _.get($scope.processorShell, 'inputObject.meta'),
          newValue: _.get($scope.processorShell, 'outputObject.meta')
        };
      });
    }
  };
});
