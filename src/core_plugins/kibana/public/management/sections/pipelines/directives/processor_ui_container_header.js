import uiModules from 'ui/modules';
import '../styles/_processor_ui_container_header.less';
import processorUiContainerHeaderTemplate from '../views/processor_ui_container_header.html';
import ProcessorCollection from 'ui/pipelines/processor_collection/view_model';
import Processor from 'ui/pipelines/processor/view_model';
import 'ui/draggable/draggable_container';
import 'ui/draggable/draggable_handle';
import 'ui/draggable/draggable_item';
import processorStates from 'ui/pipelines/constants/processor_states';
import processorCollectionTypes from 'ui/pipelines/constants/processor_collection_types';

const app = uiModules.get('kibana');

app.directive('processorUiContainerHeader', function () {
  return {
    restrict: 'E',
    scope: {
      processorCollection: '=',
      processorShell: '=',
      pipeline: '='
    },
    template: processorUiContainerHeaderTemplate,
    controller: function ($scope) {
      $scope.collectionTypes = processorCollectionTypes;
      $scope.processorStates = processorStates;

      const processorShell = $scope.processorShell;

      $scope.$on('drag-start', e => {
        $scope.wasCollapsed = processorShell.collapsed;
        processorShell.collapsed = true;
      });

      $scope.$on('drag-end', e => {
        processorShell.collapsed = $scope.wasCollapsed;
        $scope.processorCollection.updateParents();
      });
    }
  };
});
