import uiModules from 'ui/modules';
import angular from 'angular';
import _ from 'lodash';
import '../styles/_processor_ui_container.less';
import './processor_output';
import './processor_ui_container_header';
import template from '../views/processor_ui_container.html';

const app = uiModules.get('kibana');

app.directive('processorUiContainer', function ($compile) {
  return {
    restrict: 'E',
    scope: {
      pipeline: '=',
      processorCollection: '=',
      processor: '='
    },
    template: template,
    link: function ($scope, $el) {
      //TODO: I THINK I can get away with this here, because if a new pipeline is
      //created, these processors will be destroyed. A processor should never have
      //its pipeline changed.
      const processor = $scope.processor;
      const pipeline = $scope.pipeline;
      const $container = $el.find('.processor-ui-content');
      const typeId = processor.typeId;

      const newScope = $scope.$new();
      newScope.pipeline = pipeline;
      newScope.processor = processor;

      const template = `<processor-ui-${typeId}></processor-ui-${typeId}>`;
      const $innerEl = angular.element(template);
      const postLink = $compile($innerEl);
      $container.append($innerEl);
      postLink(newScope);

      $scope.$watch('processorForm.$pristine', (pristine) => {
        if (!pristine) {
          processor.new = false;
        }
      });
    }
  };
});
