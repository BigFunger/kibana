import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './processor_error.html';
import { processorStates } from 'plugins/pipelines/lib/constants/processor_states';
import './processor_error.less';

const app = uiModules.get('pipelines');

app.directive('processorError', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      processorShell: '='
    },
    controllerAs: 'processorError',
    bindToController: true,
    controller: function ($scope) {
      this.processorStates = processorStates;
    }
  };
});
