import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './processor_tree_item.html';
import { processorStates } from 'plugins/pipelines/lib/constants/processor_states';
import '../recursion_helper';
import './processor_tree_item.less';

const app = uiModules.get('pipelines');

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
      if (this.processorShell.constructor.name !== 'ProcessorShell') return;

      this.processorStates = processorStates;
      this.childItems = this.processorShell.failureProcessorCollection.processors;

      this.delete = () => {
        this.rootProcessorTree.selectItem(this.processorShell.pipeline);
        this.processorShell.parentProcessorCollection.remove(this.processorShell);
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
