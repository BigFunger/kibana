import modules from 'ui/modules';
import template from './pipeline_output.html';
import './pipeline_output.less';

const app = modules.get('apps/management');

app.directive('pipelineOutput', function () {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'pipelineOutput',
    controller: function ($scope) {
      this.showMeta = false;
    }
  };
});
