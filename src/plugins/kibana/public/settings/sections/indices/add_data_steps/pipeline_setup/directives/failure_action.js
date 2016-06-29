import _ from 'lodash';
import uiModules from 'ui/modules';
import template from '../views/failure_action.html';
import '../styles/_failure_action.less';

const app = uiModules.get('kibana');

app.directive('failureAction', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      failureAction: '=',
      allowIgnore: '=',
      processorCollection: '=',
      pipeline: '='
    },
    controller: function ($scope) {
      $scope.allowIgnore = !!$scope.allowIgnore;
      $scope.options = [
        { label: 'Ignore, and index document', value: 'ignore_error' },
        { label: 'Do not index document', value: 'index_fail' },
        { label: 'Execute other processors', value: 'on_error' }
      ];

      if (!$scope.allowIgnore) {
        _.pullAt($scope.options, 0);
      }

      $scope.defineProcessors = () => {
        $scope.pipeline.pushProcessorCollection($scope.processorCollection);
      };

      $scope.$watch('failureAction', () => { $scope.pipeline.setDirty(); });
    }
  };
});
