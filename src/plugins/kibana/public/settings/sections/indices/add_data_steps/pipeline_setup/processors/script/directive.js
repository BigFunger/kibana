import uiModules from 'ui/modules';
import template from './view.html';

const app = uiModules.get('kibana');

//scope.pipeline, scope.processor are attached by the process_container.
app.directive('processorUiScript', function () {
  return {
    restrict: 'E',
    template: template,
    controller : function ($scope) {
      const processor = $scope.processor;
      const pipeline = $scope.pipeline;

      $scope.$watch('processor.targetField', () => { pipeline.setDirty(); });
      $scope.$watch('processor.language', () => { pipeline.setDirty(); });
      $scope.$watch('processor.filename', () => { pipeline.setDirty(); });
      $scope.$watch('processor.scriptId', () => { pipeline.setDirty(); });
      $scope.$watch('processor.inlineScript', () => { pipeline.setDirty(); });
    }
  };
});
