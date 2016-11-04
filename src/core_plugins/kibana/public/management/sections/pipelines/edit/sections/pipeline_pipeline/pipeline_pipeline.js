import _ from 'lodash';
import modules from 'ui/modules';
import template from './pipeline_pipeline.html';
import './pipeline_pipeline.less';
import PipelinesProvider from 'ui/pipelines';

const app = modules.get('apps/management');

app.directive('pipelinePipeline', function () {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'pipelinePipeline',
    controller: function ($scope) {
    }
  };
});
