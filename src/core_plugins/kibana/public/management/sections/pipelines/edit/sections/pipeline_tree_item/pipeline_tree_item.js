import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './pipeline_tree_item.html';
import processorStates from 'ui/pipelines/constants/processor_states';
import '../recursion_helper/recursion_helper';
import './pipeline_tree_item.less';

const app = uiModules.get('kibana');

app.directive('pipelineTreeItem', function (RecursionHelper) {
  return {
    restrict: 'E',
    template: template,
    scope: {
      expanded: '=',
      pipeline: '=',
      rootProcessorTree: '='
    },
    controllerAs: 'pipelineTreeItem',
    bindToController: true,
    compile: function (element) {
      // Use the compile function from the RecursionHelper,
      // And return the linking function(s) which it returns
      return RecursionHelper.compile(element);
    },
    controller: function ($scope) {
      if (this.pipeline.constructor.name !== 'Pipeline') return;

      this.childItems = this.pipeline.processorCollection.processors;

      this.selectItem = () => {
        this.rootProcessorTree.selectItem(this.pipeline);
      };
    }
  };
});
