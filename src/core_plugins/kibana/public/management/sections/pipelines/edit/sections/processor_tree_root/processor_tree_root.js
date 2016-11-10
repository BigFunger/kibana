import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './processor_tree_root.html';
import './processor_tree_root.less';

const app = uiModules.get('kibana');

app.directive('processorTreeRoot', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      pipeline: '=',
      selectedItemController: '='
    },
    controller: function ($scope) {
      $scope.pipeline.expanded = true;

      $scope.selectItem = (pipeline) => {
        $scope.selectedItemController.selectedItem = pipeline;
      };

      // $scope.$watch('selectedItemController.selectedItem', (processorShell) => {
      //   const allProcessorCollections = $scope.processorShell.allProcessorCollections;
      //   _.forEach(allProcessorCollections, (processorCollection) => {
      //     if (_.contains(processorCollection.processors, processorShell)) {
      //       $scope.processorShell.expanded = true;
      //     }
      //   });
      // });
    }
  };
});
