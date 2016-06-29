import _ from 'lodash';
import uiModules from 'ui/modules';
import template from '../views/failure_options.html';
import '../styles/_failure_options.less';

const app = uiModules.get('kibana');

app.directive('failureOptions', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      processor: '=',
      pipeline: '='
    },
    controller: function ($scope) {
      const pipeline = $scope.pipeline;
      const processor = $scope.processor;

      $scope.options = [
        { label: 'Ignore, and index document', value: 'ignore_error' },
        { label: 'Do not index document', value: 'index_fail' },
        { label: 'Execute other processors', value: 'on_error' }
      ];

      $scope.defineProcessors = () => {
        pipeline.pushProcessorCollection(processor.errorProcessorCollection);
      };

      $scope.$watch('processor.failureAction', () => { pipeline.setDirty(); });
    }
  };
});
