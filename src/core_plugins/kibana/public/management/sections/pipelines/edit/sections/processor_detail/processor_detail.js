import _ from 'lodash';
import angular from 'angular';
import uiModules from 'ui/modules';
import template from './processor_detail.html';
import './processor_detail.less';

const app = uiModules.get('kibana');

app.directive('processorDetail', function ($compile, $timeout) {
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

        if (!processorShell) return;

        const newScope = $scope.$new();
        newScope.pipeline = pipeline;
        newScope.processor = processorShell.processor;
        newScope.processorShell = processorShell;
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

        const formField = $scope.processorForm.processorTypeId;
        formField.$setValidity('', true);
      });

      $scope.$watch('processorShell', (processorShell) => {
        const oldProcessorTypeId = $scope.processorTypeId;

        $scope.processorTypeId = _.get(processorShell, 'typeId');
        if (oldProcessorTypeId === $scope.processorTypeId) {
          updateUi();
        }
        if (!$scope.processorTypeId) {
          $scope.pipelineProcessors.configSection.collapsed = false;
        }

        $timeout(() => {
          const $select = $el.find('.ui-select-focusser');
          const $selectScope = $select.scope();
          $selectScope.$select.setFocus();
        });
      });

      $scope.$watch('processorShell.error', (error) => {
        _.forEach($scope.processorForm.$error, (fieldErrors) => {
          _.forEach(fieldErrors, (errorField) => {
            errorField.$setValidity('', true);
            errorField.$setUntouched();
            errorField.$setPristine();
          });
        });

        if (error && error.field) {
          const formField = $scope.processorForm[error.field];
          formField.$setValidity('', false);
          formField.$setTouched();
          formField.$setDirty();
        }
      });
    }
  };
});
