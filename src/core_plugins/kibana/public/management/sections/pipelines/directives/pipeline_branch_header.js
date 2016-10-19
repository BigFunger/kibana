import uiModules from 'ui/modules';
import { forEach } from 'lodash';
import '../styles/_pipeline_branch_header.less';
import template from '../views/pipeline_branch_header.html';
import ProcessorCollection from 'ui/pipelines/processor_collection/view_model';

const app = uiModules.get('kibana');

app.directive('pipelineBranchHeader', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      pipeline: '='
    },
    controller: function ($scope) {
      $scope.$watch('pipeline.activeProcessorCollection', () => {
        const pipeline = $scope.pipeline;
        $scope.processorCollection = $scope.pipeline.activeProcessorCollection;
        $scope.type = $scope.processorCollection.type;
        $scope.processor = $scope.processorCollection.parentProcessor;

        $scope.returnToParentProcessor = () => {
          pipeline.jumpToProcessor($scope.processor);
          pipeline.showJumpToProcessor = false;
        };

        $scope.returnToMainPipeline = () => {
          pipeline.jumpToRoot();
          pipeline.showJumpToProcessor = false;
        };

        $scope.jumpToProcessor = () => {
          pipeline.showJumpToProcessor = true;
        };
      });
    }
  };
});
