import uiModules from 'ui/modules';
import template from './processor_ui_foreach.html';
import './processor_ui_foreach.less';

const app = uiModules.get('pipelines');

//scope.pipeline, scope.processor are attached by the process_container.
app.directive('processorUiForeach', function () {
  return {
    restrict: 'E',
    template: template,
    controller : function ($scope) {
      const processor = $scope.processor;
      const pipeline = $scope.pipeline;

      $scope.$watch('processor.field', () => {
        $scope.processor.updateProcessorCollection();
        pipeline.setDirty();
      });

      $scope.defineProcessors = () => {
        $scope.pipeline.pushProcessorCollection(processor.processorCollection);
      };
    }
  };
});
