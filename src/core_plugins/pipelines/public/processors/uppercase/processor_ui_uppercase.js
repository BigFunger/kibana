import uiModules from 'ui/modules';
import template from './processor_ui_uppercase.html';

const app = uiModules.get('pipelines');

//scope.processor, scope.pipeline are attached by the process_container.
app.directive('processorUiUppercase', function () {
  return {
    restrict: 'E',
    template: template,
    controller : function ($scope) {
      const processor = $scope.processor;
      const pipeline = $scope.pipeline;

      $scope.$watch('processor.field', () => { pipeline.setDirty(); });
      $scope.$watch('processor.ignoreMissing', () => { pipeline.setDirty(); });
    }
  };
});
