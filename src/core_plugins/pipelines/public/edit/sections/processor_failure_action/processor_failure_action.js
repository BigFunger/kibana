import uiModules from 'ui/modules';
import template from './processor_failure_action.html';
import './processor_failure_action.less';

const app = uiModules.get('pipelines');

app.directive('processorFailureAction', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      processorShell: '=',
      pipelineProcessors: '='
    },
    controller: function ($scope) {
      const options = $scope.options = {
        ignore_error: 'Ignore, and index document',
        index_fail: 'Do not index document',
        on_error: 'Execute other processors'
      };

      $scope.$watch('processorShell.failureAction', (newValue, oldValue) => {
        if (!$scope.processorShell) return;

        const processorShell = $scope.processorShell;
        const processorCollection = processorShell.failureProcessorCollection;

        if (newValue === 'on_error') {
          if (processorCollection.processors.length === 0) {
            const newProcessorShell = processorShell.failureProcessorCollection.add();
            $scope.pipelineProcessors.selectedItem = newProcessorShell;
          }
        }
      });
    }
  };
});
