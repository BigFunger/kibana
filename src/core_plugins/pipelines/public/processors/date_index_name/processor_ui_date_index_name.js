import uiModules from 'ui/modules';
import template from './processor_ui_date_index_name.html';
import './processor_ui_date_index_name.less';

const app = uiModules.get('pipelines');

//scope.pipeline, scope.processor are attached by the process_container.
app.directive('processorUiDateIndexName', function () {
  return {
    restrict: 'E',
    template: template,
    controller : function ($scope) {
      const processor = $scope.processor;
      const pipeline = $scope.pipeline;

      $scope.roundingTypes = [
        { value: 'y', label: 'Year' },
        { value: 'M', label: 'Month' },
        { value: 'w', label: 'Week' },
        { value: 'd', label: 'Day' },
        { value: 'h', label: 'Hour' },
        { value: 'm', label: 'Minute' },
        { value: 's', label: 'Second' }
      ];

      $scope.$watch('processor.field', () => { pipeline.setDirty(); });
      $scope.$watch('processor.indexNamePrefix', () => { pipeline.setDirty(); });
      $scope.$watch('processor.dateRounding', () => { pipeline.setDirty(); });
      $scope.$watch('processor.formats', () => { pipeline.setDirty(); });
      $scope.$watch('processor.timezone', () => { pipeline.setDirty(); });
      $scope.$watch('processor.locale', () => { pipeline.setDirty(); });
      $scope.$watch('processor.indexNameFormat', () => { pipeline.setDirty(); });
    }
  };
});
