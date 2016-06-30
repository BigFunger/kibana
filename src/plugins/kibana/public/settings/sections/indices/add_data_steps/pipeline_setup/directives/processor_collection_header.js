import uiModules from 'ui/modules';
import _ from 'lodash';
import '../styles/_processor_collection_header.less';
import template from '../views/processor_collection_header.html';

const app = uiModules.get('kibana');

app.directive('processorCollectionHeader', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      pipeline: '='
    },
    controller: function ($scope) {
      $scope.$watch('pipeline.activeProcessorCollection', () => {
        updateBreadcrumbs();
      });

      function updateBreadcrumbs() {
        const pipeline = $scope.pipeline;
        const breadcrumbs = [];

        _.forEach(pipeline.processorCollections, (processorCollection) => {
          breadcrumbs.push(processorCollection.title);
        });
        breadcrumbs.push(pipeline.activeProcessorCollection.title);

        $scope.breadcrumbs = breadcrumbs;
      }

      $scope.navigateTo = function (index) {
        $scope.pipeline.jumpToProcessorCollection(index);
      };
    }
  };
});
