import uiModules from 'ui/modules';
import template from './pipeline_processors_nav.html';
import './pipeline_processors_nav.less';

const app = uiModules.get('pipelines');

app.directive('pipelineProcessorsNav', function () {
  return {
    restrict: 'E',
    template: template,
    controller: function ($scope) {
      $scope.pipelineTreeItems = [ $scope.pipeline ];
    }
  };
});
