import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './processor_type_select.html';
import PipelinesProvider from 'ui/pipelines';
import processorRegistryProvider from 'ui/registry/pipelines_processors';
import './processor_type_select.less';
import 'ui-select';

const app = uiModules.get('kibana');

function buildProcessorTypeList(processorRegistry) {
  const result = [];
  _.forIn(processorRegistry.byId, (registryItem) => {
    const instance = new registryItem.ViewModel();
    if (instance.typeId !== 'unknown') {
      result.push({
        typeId: instance.typeId,
        title: instance.title,
        helpText: instance.helpText
      });
    }
  });

  return _(result)
    .compact()
    .sortBy('title')
    .value();
}

app.directive('processorTypeSelect', function ($timeout, Private) {
  return {
    restrict: 'E',
    template: template,
    scope: {
      processorTypeId: '='
    },
    link: function ($scope, $element) {
      $timeout(() => {
        $element.find('.ui-select-toggle').removeClass('btn btn-default');
        $element.find('.ui-select-focusser')[0].focus();
      });
    },
    controller: function ($scope, Private, Notifier) {
      const pipelines = Private(PipelinesProvider);
      const notify = new Notifier({ location: `Ingest Pipeline Setup` });
      const processorRegistry = Private(processorRegistryProvider);

      $scope.processorTypes = buildProcessorTypeList(processorRegistry);
      $scope.$watch('selectedItem.value', (newVal) => {
        if (!newVal) return;

        $scope.processorTypeId = newVal.typeId;
      });

      $scope.$watch('processorTypeId', processorTypeId => {
        if (!processorTypeId) {
          $scope.selectedItem = { value: '' };
        }
      });
    }
  };
});
