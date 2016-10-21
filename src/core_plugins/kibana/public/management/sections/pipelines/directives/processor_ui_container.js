import uiModules from 'ui/modules';
import angular from 'angular';
import '../styles/_processor_ui_container.less';
import './processor_output';
import './processor_ui_container_header';
import Processor from 'ui/pipelines/processor/view_model';
import template from '../views/processor_ui_container.html';

const app = uiModules.get('kibana');

app.directive('processorUiContainer', function ($compile, $timeout) {
  return {
    restrict: 'E',
    scope: {
      pipeline: '=',
      processorCollection: '=',
      processor: '='
    },
    template: template,
    link: function ($scope, $el) {
      $timeout(() => {
        $el.find('.ui-select-focusser')[0].focus();
      });

      const pipeline = $scope.pipeline;
      const $container = $el.find('.processor-ui-content');
      const processorStates = $scope.processorStates = Processor.states;

      $scope.$watch('processorTypeId', (typeId) => {
        //const processor = $scope.processor;

        const newScope = $scope.$new();
        newScope.pipeline = pipeline;
        newScope.processor = $scope.processor;
        //newScope.processor = processor;

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
