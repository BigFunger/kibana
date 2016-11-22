import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './pipeline_processors.html';
import './pipeline_processors.less';
import { PipelinesProvider } from 'plugins/pipelines/pipelines_service';

const app = uiModules.get('pipelines');

app.directive('pipelineProcessors', function () {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'pipelineProcessors',
    controller: function ($scope, Private, Notifier) {
      const pipelines = Private(PipelinesProvider);
      const notify = new Notifier({ location: `Pipeline Setup` });

      this.pipeline = $scope.pipeline;
      this.selectedItem = _.first($scope.pipeline.processorCollection.processors);

      this.simulate = () => {
        const pipeline = $scope.pipeline;
        if (!pipeline.sampleCollection.getCurrentSample()) return;

        return pipelines.pipeline.simulate(pipeline.model)
        .then((results) => { pipeline.applySimulateResults(results); })
        .catch(notify.error);
      };

      $scope.$watch('pipeline.sampleCollection.index', () => {
        this.simulate();
      });

      $scope.$watch('pipelineProcessors.selectedItem', (selectedItem) => {
        if (selectedItem && selectedItem.constructor.name === 'ProcessorShell') {
          this.selectedProcessorShell = selectedItem;
        } else {
          this.selectedProcessorShell = undefined;
        }
      });

      this.docModes = {
        document: {
          title: 'Document'
        },
        meta: {
          title: 'Metadata'
        }
      };
      this.detailState = {
        input: {
          collapsed: false,
          docMode: this.docModes.document
        },
        configuration: {
          collapsed: false
        },
        output: {
          collapsed: false,
          docMode: this.docModes.document
        }
      };
    }
  };
});
