import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './view.html';
import './styles.less';

const app = uiModules.get('kibana');

//scope.processor, scope.pipeline are attached by the process_container.
app.directive('processorUiGeoip', function () {
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

      function splitValues(delimitedList) {
        return delimitedList.split('\n');
      }

      function joinValues(valueArray) {
        return valueArray.join('\n');
      }

      function updateDatabaseFields() {
        const fieldsString = $scope.databaseFields.replace(/,/g, '\n');
        processor.databaseFields = _(splitValues(fieldsString)).map(_.trim).compact().value();
        $scope.databaseFields = joinValues(processor.databaseFields);
      }

      $scope.databaseFields = joinValues(processor.databaseFields);

      $scope.$watch('databaseFields', updateDatabaseFields);

      $scope.$watch('processor.inputObject', consumeNewInputObject);

      $scope.$watch('processor.sourceField', () => {
        refreshFieldData();
        pipeline.setDirty();
      });

      $scope.$watch('processor.targetField', () => { pipeline.setDirty(); });
      $scope.$watch('processor.databaseFile', () => { pipeline.setDirty(); });
      $scope.$watchCollection('processor.databaseFields', () => { pipeline.setDirty(); });
    }
  };
});
