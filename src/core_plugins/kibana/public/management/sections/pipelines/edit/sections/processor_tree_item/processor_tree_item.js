import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './processor_tree_item.html';
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
      $scope.$on('drag-start', e => {
        $scope.wasCollapsed = $scope.processorShell.expanded;
        $scope.processorShell.expanded = false;
      });

      $scope.$on('drag-end', e => {
        $scope.processorShell.expanded = $scope.wasCollapsed;
        $scope.processorCollection.updateParents();
      });
    }
  };
});
