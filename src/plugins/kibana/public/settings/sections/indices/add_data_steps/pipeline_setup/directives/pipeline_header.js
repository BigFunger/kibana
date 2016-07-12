import uiModules from 'ui/modules';
import _ from 'lodash';
import '../styles/_pipeline_header.less';
import template from '../views/pipeline_header.html';
import ProcessorCollection from '../lib/processor_collection';

const app = uiModules.get('kibana');

app.directive('pipelineHeader', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      pipeline: '='
    },
    controller: function ($scope) {
      $scope.collectionTypes = ProcessorCollection.types;

      $scope.$watch('pipeline.activeProcessorCollection', (newVal) => {
        $scope.collectionType = newVal.type;
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
