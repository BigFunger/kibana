import _ from 'lodash';
import uiModules from 'ui/modules';
import createMultiSelectModel from '../../lib/create_multi_select_model';
import template from './view.html';
import './styles.less';

const app = uiModules.get('kibana');

//scope.processor, scope.pipeline are attached by the process_container.
app.directive('processorUiDate', function () {
  return {
    restrict: 'E',
    template: template,
    controller : function ($scope, debounce) {
      const processor = $scope.processor;
      const pipeline = $scope.pipeline;

      function consumeNewInputObject() {
        refreshFieldData();
      }

      function refreshFieldData() {
        $scope.fieldData = _.get(processor.inputObject, processor.sourceField);
      }

      const updateFormats = debounce(() => {
        processor.formats = _($scope.formats)
        .filter('selected')
        .map('title')
        .value();

        $scope.customFormatSelected = _.includes(processor.formats, 'Custom');
        pipeline.setDirty();
      }, 200);

      $scope.updateFormats = updateFormats;
      $scope.formats = createMultiSelectModel(['ISO8601', 'UNIX', 'UNIX_MS', 'TAI64N', 'Custom'], processor.formats);

      $scope.$watch('processor.inputObject', consumeNewInputObject);

      $scope.$watch('processor.sourceField', () => {
        refreshFieldData();
        pipeline.setDirty();
      });

      $scope.$watch('processor.customFormat', updateFormats);
      $scope.$watch('processor.targetField', () => { pipeline.setDirty(); });
      $scope.$watch('processor.timezone', () => { pipeline.setDirty(); });
      $scope.$watch('processor.locale', () => { pipeline.setDirty(); });
    }
  };
});
