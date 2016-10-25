import uiModules from 'ui/modules';
import template from '../views/pipeline_branch.html';

const app = uiModules.get('kibana');

app.directive('pipelineBranch', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      pipeline: '='
    },
    controller: function ($scope) {
    }
  };
});
