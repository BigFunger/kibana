import { isObject } from 'lodash';
import uiModules from 'ui/modules';
import template from './processor_ui_unknown.html';

const app = uiModules.get('pipelines');

//scope.processorShell is attached by the processorDetail directive.
app.directive('processorUiUnknown', function () {
  return {
    restrict: 'E',
    template: template,
    controller : function ($scope) {
      $scope.processor = $scope.processorShell.processor;
      const pipeline = $scope.processorShell.pipeline;

      $scope.formattedJson = JSON.stringify($scope.processor.json);

      function updateJson() {
        try {
          const json = JSON.parse($scope.formattedJson);
          if (isObject(json)) {
            $scope.processor.json = json;
          } else {
            $scope.processor.json = {};
          }
        }
        catch (error) {
          $scope.processor.json = {};
        }
      }

      $scope.$watch('formattedJson', updateJson);
      $scope.$watch('processor.json', () => { pipeline.setDirty(); });
    }
  };
});
