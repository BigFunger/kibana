import uiModules from 'ui/modules';
import template from './view.html';

const app = uiModules.get('kibana');

//scope.pipeline, scope.processor are attached by the process_container.
app.directive('processorUiSet', function () {
  return {
    restrict: 'E',
    template: template,
    controller : function ($scope) {
      const processor = $scope.processor;
      const pipeline = $scope.pipeline;

      function processorUiChanged() {
        pipeline.setDirty();
      }

      $scope.$watch('processor.targetField', processorUiChanged);
      $scope.$watch('processor.value', processorUiChanged);
      $scope.$watch('processor.ignoreFailure', processorUiChanged);
    }
  };
});
