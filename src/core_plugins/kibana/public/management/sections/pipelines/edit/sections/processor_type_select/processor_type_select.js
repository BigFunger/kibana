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

app.directive('processorTypeSelect', function ($timeout, Private, Notifier) {
  return {
    restrict: 'E',
    template: template,
    scope: {
      processorTypeId: '='
    },
    link: function ($scope, $el, attr) {
      const pipelines = Private(PipelinesProvider);
      const notify = new Notifier({ location: `Ingest Pipeline Setup` });
      const processorRegistry = Private(processorRegistryProvider);

      $scope.processorTypes = buildProcessorTypeList(processorRegistry);
      const processorTypesById = _.reduce($scope.processorTypes, (result, processorType) => {
        return _.set(result, processorType.typeId, processorType);
      }, {});

      $scope.$watch('selectedItem.value', (newVal) => {
        if (!newVal) return;

        $scope.processorTypeId = newVal.typeId;
        $scope.previousSelectedItem = $scope.selectedItem;
      });

      $scope.$watch('processorTypeId', (processorTypeId) => {
        if (!processorTypeId) {
          $scope.selectedItem = { value: '' };

          $timeout(() => {
            $el.find('.ui-select-focusser')[0].focus();
          });
        } else {
          const processorType = processorTypesById[processorTypeId];
          $scope.selectedItem = { value: processorType };
        }
      });
    }
  };
});

app.directive('processorTypeSelectTweaks', function ($timeout) {
  return {
    restrict: 'A',
    link: function ($scope, $el) {
      const select = $scope.$select;

      $timeout(() => {
        const searchBox = $el.find('.ui-select-search');
        searchBox.blur((event) => {
          if (select.items.length === 0) {
            select.open = false;
          }
        });
        $el.find('.ui-select-toggle').removeClass('btn btn-default');
      });
    }
  };
});
