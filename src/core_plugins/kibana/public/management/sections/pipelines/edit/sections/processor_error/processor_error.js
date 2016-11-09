import _ from 'lodash';
import uiModules from 'ui/modules';
import './processor_error.less';
import template from './processor_error.html';
import processorStates from 'ui/pipelines/constants/processor_states';

const app = uiModules.get('kibana');

app.directive('processorError', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      processorShell: '='
    },
    controller: function ($scope) {
      $scope.processorStates = processorStates;
    }
  };
});
