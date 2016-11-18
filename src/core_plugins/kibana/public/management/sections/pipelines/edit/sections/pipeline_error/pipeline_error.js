import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './pipeline_error.html';
import './pipeline_error.less';

const app = uiModules.get('kibana');

app.directive('pipelineError', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      pipeline: '='
    },
    controllerAs: 'pipelineError',
    bindToController: true,
    controller: function ($scope) {
    }
  };
});
