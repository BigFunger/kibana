import uiModules from 'ui/modules';
import template from './processor_ui_convert.html';

const app = uiModules.get('pipelines');

//scope.processor, scope.pipeline are attached by the process_container.
app.directive('processorUiConvert', function () {
  return {
    restrict: 'E',
    template: template,
    controller : function ($scope) {
      const processor = $scope.processor;
      const pipeline = $scope.pipeline;

      $scope.types = ['auto', 'number', 'string', 'boolean'];

      $scope.$watch('processor.field', () => { pipeline.setDirty(); });
      $scope.$watch('processor.type', () => { pipeline.setDirty(); });
      $scope.$watch('processor.targetField', () => { pipeline.setDirty(); });
      $scope.$watch('processor.ignoreMissing', () => { pipeline.setDirty(); });
    }
  };
});
