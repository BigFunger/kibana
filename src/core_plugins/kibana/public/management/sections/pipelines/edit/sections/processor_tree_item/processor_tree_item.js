import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './processor_tree_item.html';
import processorStates from 'ui/pipelines/constants/processor_states';
import '../recursion_helper/recursion_helper';
import './processor_tree_item.less';

const app = uiModules.get('kibana');

app.directive('processorTreeItem', function (RecursionHelper) {
  return {
    restrict: 'E',
    template: template,
    scope: {
      processorCollection: '=',
      processorShell: '=',
      pipelineProcessors: '='
    },
    compile: function (element) {
      // Use the compile function from the RecursionHelper,
      // And return the linking function(s) which it returns
      return RecursionHelper.compile(element);
    },
    controller: function ($scope) {
      $scope.processorStates = processorStates;

      $scope.delete = () => {
        $scope.processorCollection.remove($scope.processorShell);
        $scope.pipelineProcessors.editProcessorShell = undefined;
      };

      $scope.$on('drag-start', e => {
        $scope.wasCollapsed = $scope.processorShell.expanded;
        $scope.processorShell.expanded = false;
      });

      $scope.$on('drag-end', e => {
        $scope.processorShell.expanded = $scope.wasCollapsed;
        $scope.processorCollection.updateParents();
      });

      $scope.$watch('pipelineProcessors.editProcessorShell', (editProcessorShell) => {
        const allProcessorCollections = $scope.processorShell.allProcessorCollections;
        _.forEach(allProcessorCollections, (processorCollection) => {
          if (_.contains(processorCollection.processors, editProcessorShell)) {
            $scope.processorShell.expanded = true;
          }
        });
      });
    }
  };
});
