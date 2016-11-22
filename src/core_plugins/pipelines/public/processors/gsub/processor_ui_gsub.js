import uiModules from 'ui/modules';
import template from './processor_ui_gsub.html';

const app = uiModules.get('kibana');

//scope.processor, scope.pipeline are attached by the process_container.
app.directive('processorUiGsub', function () {
  return {
    restrict: 'E',
    template: template,
    controller : function ($scope) {
      const processor = $scope.processor;
      const pipeline = $scope.pipeline;

      $scope.$watch('processor.field', () => { pipeline.setDirty(); });
      $scope.$watch('processor.pattern', () => { pipeline.setDirty(); });
      $scope.$watch('processor.replacement', () => { pipeline.setDirty(); });
    }
  };
});
