import modules from 'ui/modules';
import template from './pipeline_processors_detail.html';
import './pipeline_processors_detail.less';

const app = modules.get('apps/management');

app.directive('pipelineProcessorsDetail', function () {
  return {
    restrict: 'E',
    template: template,
    controller: function ($scope) {
    }
  };
});
