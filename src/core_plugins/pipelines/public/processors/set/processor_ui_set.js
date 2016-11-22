import uiModules from 'ui/modules';
import template from './processor_ui_set.html';

const app = uiModules.get('pipelines');

//scope.pipeline, scope.processor are attached by the process_container.
app.directive('processorUiSet', function () {
  return {
    restrict: 'E',
    template: template,
    controller : function ($scope) {
      const processor = $scope.processor;
      const pipeline = $scope.pipeline;

      $scope.$watch('processor.field', () => { pipeline.setDirty(); });
      $scope.$watch('processor.value', () => { pipeline.setDirty(); });
      $scope.$watch('processor.override', () => { pipeline.setDirty(); });
    }
  };
});
