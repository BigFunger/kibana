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
      pipelineProcessors: '=',
      processorCollection: '=',
      title: '@'
    },
    controller: function ($scope) {
      $scope.addProcessor = () => {
        const currentProcessor = $scope.pipelineProcessors.editProcessorShell;
        const allProcessorCollections = $scope.processorCollection.allProcessorCollections;

        let targetProcessorCollection = $scope.processorCollection;
        _.forEach(allProcessorCollections, (processorCollection) => {
          if (_.contains(processorCollection.processors, currentProcessor)) {
            targetProcessorCollection = processorCollection;
          }
        });

        targetProcessorCollection.add();
      };
    }
  };
});
