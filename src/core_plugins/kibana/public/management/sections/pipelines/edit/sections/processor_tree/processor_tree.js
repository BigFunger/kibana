import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './processor_tree.html';
import './processor_tree.less';

const app = uiModules.get('kibana');

app.directive('processorTree', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      processorCollection: '=',
      selected: '=',
      rootProcessorTree: '='
    },
    controllerAs: 'processorTree',
    bindToController: true,
    controller: function () {
      this.processors = this.processorCollection.processors;
      this.rootProcessorTree = this.rootProcessorTree || this;

      this.selectItem = function (processorShell) {
        this.selected = processorShell;
      };
    }
  };
});
