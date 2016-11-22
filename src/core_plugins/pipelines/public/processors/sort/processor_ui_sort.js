import uiModules from 'ui/modules';
import template from './processor_ui_sort.html';

const app = uiModules.get('pipelines');

//scope.processorShell is attached by the processorDetail directive.
app.directive('processorUiSort', function () {
  return {
    restrict: 'E',
    template: template,
    controller : function ($scope) {
      $scope.processor = $scope.processorShell.processor;
      const pipeline = $scope.processorShell.pipeline;

      $scope.sortOrders = {
        asc: 'Ascending',
        desc: 'Descending'
      };

      $scope.$watch('processor.field', () => { pipeline.setDirty(); });
      $scope.$watch('processor.sortOrder', () => { pipeline.setDirty(); });
    }
  };
});
