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

      function getCrumb(processorCollection) {
        if (processorCollection.parentProcessor) {
          const processor = processorCollection.parentProcessor;
          return {
            primary: processor.title,
            secondary: processor.description
          };
        } else {
          return {
            primary: processorCollection.title
          };
        }
      }

      function updateBreadcrumbs() {
        const pipeline = $scope.pipeline;
        const breadcrumbs = [];

        _.forEach(pipeline.processorCollections, (processorCollection) => {
          breadcrumbs.push(getCrumb(processorCollection));
        });
        breadcrumbs.push(getCrumb(pipeline.activeProcessorCollection));

        $scope.breadcrumbs = breadcrumbs;
      }

      $scope.navigateTo = function (index) {
        $scope.pipeline.jumpToProcessorCollection(index);
      };
    }
  };
});
