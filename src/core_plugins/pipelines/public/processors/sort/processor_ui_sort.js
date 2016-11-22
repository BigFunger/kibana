import uiModules from 'ui/modules';
import template from './processor_ui_sort.html';

const app = uiModules.get('pipelines');

//scope.pipeline, scope.processor are attached by the process_container.
app.directive('processorUiSort', function () {
  return {
    restrict: 'E',
    template: template,
    controller : function ($scope) {
      const processor = $scope.processor;
      const pipeline = $scope.pipeline;

      $scope.sortOrders = {
        asc: 'Ascending',
        desc: 'Descending'
      };

      $scope.$watch('processor.field', () => { pipeline.setDirty(); });
      $scope.$watch('processor.sortOrder', () => { pipeline.setDirty(); });
    }
  };
});
