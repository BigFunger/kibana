import modules from 'ui/modules';
import template from './pipeline_pipeline_detail.html';
import './pipeline_pipeline_detail.less';

const app = modules.get('apps/management');

app.directive('pipelinePipelineDetail', function () {
  return {
    restrict: 'E',
    template: template,
    controller: function ($scope) {
    }
  };
});
