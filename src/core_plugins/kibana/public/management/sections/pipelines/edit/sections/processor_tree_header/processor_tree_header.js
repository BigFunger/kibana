import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './processor_tree_header.html';
import './processor_tree_header.less';

const app = uiModules.get('kibana');

app.directive('processorTreeHeader', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      selectedItem: '=',
      processorCollection: '=',
      title: '@'
    },
    controllerAs: 'processorTreeHeader',
    bindToController: true,
    controller: function ($scope) {
      $scope.addProcessor = () => {
        const currentProcessor = this.selectedItem;
        const allProcessorCollections = this.processorCollection.allProcessorCollections;

        let targetProcessorCollection = this.processorCollection;
        _.forEach(allProcessorCollections, (processorCollection) => {
          if (_.contains(processorCollection.processors, currentProcessor)) {
            targetProcessorCollection = processorCollection;
          }
        });

        const newProcessorShell = targetProcessorCollection.add();
        this.selectedItem = newProcessorShell;
      };
    }
  };
});
