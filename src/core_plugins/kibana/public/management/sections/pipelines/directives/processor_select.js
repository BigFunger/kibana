import uiModules from 'ui/modules';
import _ from 'lodash';
import '../styles/_processor_select.less';
import template from '../views/processor_select.html';
import IngestProvider from 'ui/ingest';
import 'ui-select';
import processorRegistryProvider from 'ui/registry/ingest_processors';

const app = uiModules.get('kibana');

function buildProcessorTypeList(processorRegistry, enabledProcessorTypeIds) {
  const result = [];
  const filtered = _.pick(processorRegistry.byId, enabledProcessorTypeIds);
  _.forIn(filtered, (registryItem) => {
    const instance = new registryItem.ViewModel(processorRegistry);
    result.push({
      typeId: instance.typeId,
      title: instance.title,
      helpText: instance.helpText
    });
  });

  return _(result)
    .compact()
    .sortBy('title')
    .value();
}

app.directive('processorSelect', function ($timeout, Private) {
  return {
    restrict: 'E',
    template: template,
    scope: {
      processorTypeId: '='
    },
    link: function ($scope, $element) {
      $timeout(() => {
        $element.find('.ui-select-focusser')[0].focus();
      });
    },
    controller: function ($scope, Private, Notifier) {
      const ingest = Private(IngestProvider);
      const notify = new Notifier({ location: `Ingest Pipeline Setup` });

      const processorRegistry = Private(processorRegistryProvider);

      //determines which processors are available on the cluster
      ingest.getProcessors()
      .then((enabledProcessorTypeIds) => {
        $scope.processorTypes = buildProcessorTypeList(processorRegistry, enabledProcessorTypeIds);
      })
      .catch(notify.error);

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
