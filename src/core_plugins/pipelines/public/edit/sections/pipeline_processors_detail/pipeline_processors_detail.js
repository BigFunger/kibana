import uiModules from 'ui/modules';
import template from './pipeline_processors_detail.html';
import './pipeline_processors_detail.less';

const app = uiModules.get('pipelines');

app.directive('pipelineProcessorsDetail', function () {
  return {
    restrict: 'E',
    template: template,
    controller: function ($scope) {
    }
  };
});
