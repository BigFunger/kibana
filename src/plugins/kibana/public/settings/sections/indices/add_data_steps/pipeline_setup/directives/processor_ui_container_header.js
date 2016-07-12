import uiModules from 'ui/modules';
import '../styles/_processor_ui_container_header.less';
import processorUiContainerHeaderTemplate from '../views/processor_ui_container_header.html';
import ProcessorCollection from '../lib/processor_collection';

const app = uiModules.get('kibana');

app.directive('processorUiContainerHeader', function () {
  return {
    restrict: 'E',
    scope: {
      processorCollection: '=',
      processor: '=',
      pipeline: '='
    },
    template: processorUiContainerHeaderTemplate,
    controller: function ($scope) {
      $scope.collectionTypes = ProcessorCollection.types;
    }
  };
});
