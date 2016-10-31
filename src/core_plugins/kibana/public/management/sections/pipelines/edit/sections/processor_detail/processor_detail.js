import _ from 'lodash';
import angular from 'angular';
import uiModules from 'ui/modules';
import template from './processor_detail.html';
import './processor_detail.less';

const app = uiModules.get('kibana');

app.directive('processorDetail', function ($compile) {
  return {
    restrict: 'E',
    template: template,
    scope: {
      pipeline: '=',
      processorShell: '=',
      pipelineProcessors: '='
    },
    link: function ($scope, $el) {
      const pipeline = $scope.pipeline;
      const $container = $el.find('.processor-ui-content');

      function updateUi() {
        const processorShell = $scope.processorShell;
        $container.empty();

        const newScope = $scope.$new();
        newScope.pipeline = pipeline;
        newScope.processor = processorShell.processor;
        const typeId = processorShell.typeId;

        if (typeId) {
          const template = `<processor-ui-${typeId}></processor-ui-${typeId}>`;
          const $innerEl = angular.element(template);
          const postLink = $compile($innerEl);
          $container.append($innerEl);
          postLink(newScope);
        }
      }

      $scope.$watch('processorTypeId', (typeId) => {
        if (!typeId) return;

        const processorShell = $scope.processorShell;
        processorShell.setTypeId(typeId);
        updateUi();
      });

      $scope.$watch('processorShell', (processorShell) => {
        $scope.processorTypeId = _.get(processorShell, 'typeId');
      });
    }
  };
});
