import uiModules from 'ui/modules';
import angular from 'angular';
import '../styles/_processor_ui_container.less';
import './processor_output';
import './processor_ui_container_header';
import Processor from 'ui/pipelines/processor/view_model';
import template from '../views/processor_ui_container.html';

const app = uiModules.get('kibana');

app.directive('processorUiContainer', function ($compile) {
  return {
    restrict: 'E',
    scope: {
      pipeline: '=',
      processorCollection: '=',
      processorShell: '='
    },
    template: template,
    link: function ($scope, $el) {
      const pipeline = $scope.pipeline;
      const processorShell = $scope.processorShell;
      const $container = $el.find('.processor-ui-content');

      $scope.$watch('processorTypeId', (typeId) => {
        if (!typeId) return;

        processorShell.setTypeId(typeId);

        const newScope = $scope.$new();
        newScope.pipeline = pipeline;
        newScope.processor = processorShell.processor;

        const template = `<processor-ui-${typeId}></processor-ui-${typeId}>`;
        const $innerEl = angular.element(template);
        const postLink = $compile($innerEl);
        $container.empty();
        $container.append($innerEl);
        postLink(newScope);
      });
    }
  };
});
