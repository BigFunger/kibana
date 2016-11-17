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
      processorShell: '=',
      rootProcessorTree: '='
    },
    controllerAs: 'processorTreeItem',
    bindToController: true,
    compile: function (element) {
      // Use the compile function from the RecursionHelper,
      // And return the linking function(s) which it returns
      return RecursionHelper.compile(element);
    },
    controller: function ($scope) {
      this.processorStates = processorStates;
      this.childProcessorCollection = this.processorShell.failureProcessorCollection;
      this.expanded = false;

      this.delete = () => {
        this.processorShell.parentProcessorCollection.remove(this.processorShell);
        this.rootProcessorTree.selectItem();
      };

      this.selectItem = () => {
        this.rootProcessorTree.selectItem(this.processorShell);
      };

      $scope.$on('drag-start', e => {
        this.wasExpanded = this.expanded;
        this.expanded = false;
      });

      $scope.$on('drag-end', e => {
        this.expanded = this.wasExpanded;
        this.processorShell.parentProcessorCollection.updateParents();
      });

      $scope.$watch('processorTreeItem.rootProcessorTree.selected', (processorShell) => {
        //if the newly selected processorShell exists anywhere in this processorShell's
        //decendents, then this processorTreeItem should expand
        const allProcessorCollections = this.processorShell.allProcessorCollections;
        _.forEach(allProcessorCollections, (processorCollection) => {
          if (_.contains(processorCollection.processors, processorShell)) {
            this.expanded = true;
          }
        });
      });
    }
  };
});
