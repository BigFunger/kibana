import uiModules from 'ui/modules';
import '../styles/_jump_to_processor.less';
import template from '../views/jump_to_processor.html';
import branchTemplate from '../views/jump_to_processor_branch.html';
import '../lib/recursion_helper';
import _ from 'lodash';

const app = uiModules.get('kibana');

app.directive('jumpToProcessor', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      pipeline: '='
    },
    controller: function ($scope) {
      const pipeline = $scope.pipeline;

      $scope.jumpToGlobalFailureRoot = () => {
        pipeline.jumpToGlobalFailureRoot();
        pipeline.showJumpToProcessor = false;
      };

      $scope.jumpToRoot = () => {
        pipeline.jumpToRoot();
        pipeline.showJumpToProcessor = false;
      };

      $scope.cancel = () => {
        pipeline.showJumpToProcessor = false;
      };
    }
  };
});

app.directive('jumpToProcessorBranch', function (RecursionHelper) {
  return {
    restrict: 'E',
    template: branchTemplate,
    scope: {
      pipeline: '=',
      processorCollection: '='
    },
    compile: function (element) {
      // Use the compile function from the RecursionHelper,
      // And return the linking function(s) which it returns
      return RecursionHelper.compile(element);
    },
    controller: function ($scope) {
      const pipeline = $scope.pipeline;

      $scope.jumpToProcessor = (processor) => {
        pipeline.jumpToProcessor(processor);
        pipeline.showJumpToProcessor = false;
      };
    }
  };
});

