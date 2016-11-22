import uiModules from 'ui/modules';
import template from './processor_ui_foreach.html';
import './processor_ui_foreach.less';

const app = uiModules.get('pipelines');

//scope.processorShell is attached by the processorDetail directive.
app.directive('processorUiForeach', function () {
  return {
    restrict: 'E',
    template: template,
    controller : function ($scope) {
      $scope.processor = $scope.processorShell.processor;
      const pipeline = $scope.processorShell.pipeline;

      $scope.$watch('processor.field', () => {
        $scope.processor.updateProcessorCollection();
        pipeline.setDirty();
      });

      $scope.defineProcessors = () => {
        $scope.pipeline.pushProcessorCollection($scope.processor.processorCollection);
      };
    }
  };
});
