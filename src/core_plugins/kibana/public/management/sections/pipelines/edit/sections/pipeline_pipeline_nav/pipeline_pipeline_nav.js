import modules from 'ui/modules';
import template from './pipeline_pipeline_nav.html';
import './pipeline_pipeline_nav.less';

const app = modules.get('apps/management');

app.directive('pipelinePipelineNav', function () {
  return {
    restrict: 'E',
    template: template,
    controller: function ($scope) {
    }
  };
});
