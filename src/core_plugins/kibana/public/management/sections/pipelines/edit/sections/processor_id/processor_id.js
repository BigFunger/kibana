import uiModules from 'ui/modules';
import template from './processor_id.html';
import './processor_id.less';

const app = uiModules.get('kibana');

app.directive('processorId', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      processorShell: '='
    },
    controller: function ($scope) {
      // const processor = $scope.processor;
      // $scope.oldProcessorId = processor.processorId;

      $scope.changeProcessorId = () => {
        // const newVal = processor.processorId;
        // const oldVal = $scope.oldProcessorId;

        // const cleanedProcessorId = ProcessorCollection.updateId(oldVal, newVal);
        // processor.processorId = cleanedProcessorId;
        // $scope.oldProcessorId = cleanedProcessorId;
      };
    }
  };
});
