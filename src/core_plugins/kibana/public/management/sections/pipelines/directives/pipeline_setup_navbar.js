import uiModules from 'ui/modules';
import template from '../views/pipeline_setup_navbar.html';
import '../styles/pipeline_setup_navbar.less';

const app = uiModules.get('kibana');

app.directive('pipelineSetupNavbar', function () {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'sidebar',
    controller: function ($scope) {
      this.showData = true;
      this.section = 'processors';

      this.jumpToProcessor = () => {
        $scope.pipeline.showJumpToProcessor = !$scope.pipeline.showJumpToProcessor;
      };
    }
  };
});
