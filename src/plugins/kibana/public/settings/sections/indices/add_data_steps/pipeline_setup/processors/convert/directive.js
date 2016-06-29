import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './view.html';

const app = uiModules.get('kibana');

//scope.processor, scope.pipeline are attached by the process_container.
app.directive('processorUiConvert', function () {
  return {
    restrict: 'E',
    template: template,
    controller : function ($scope) {
      const processor = $scope.processor;
      const pipeline = $scope.pipeline;

      function consumeNewInputObject() {
        refreshFieldData();
      }

      function refreshFieldData() {
        $scope.fieldData = _.get(processor.inputObject, processor.sourceField);
      }

      $scope.types = ['auto', 'number', 'string', 'boolean'];

      $scope.$watch('processor.inputObject', consumeNewInputObject);

      $scope.$watch('processor.sourceField', () => {
        refreshFieldData();
        pipeline.setDirty();
      });

      $scope.$watch('processor.type', () => { pipeline.setDirty(); });
      $scope.$watch('processor.targetField', () => { pipeline.setDirty(); });
    }
  };
});
