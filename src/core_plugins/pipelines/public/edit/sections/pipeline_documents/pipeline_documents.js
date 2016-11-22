import uiModules from 'ui/modules';
import template from './pipeline_documents.html';
import './pipeline_documents.less';
import { Sample } from 'plugins/pipelines/lib/sample';

const app = uiModules.get('pipelines');

app.directive('pipelineDocuments', function () {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'pipelineDocuments',
    controller: function ($scope) {
      const sampleCollection = $scope.pipeline.sampleCollection;
      this.editSample = sampleCollection.getCurrentSample();

      this.add = () => {
        const sample = new Sample({ description: sampleCollection.getSuggestedDescription(), doc: {} });
        sampleCollection.add(sample);
        this.editSample = sample;
      };

      this.remove = (sample) => {
        sampleCollection.remove(sample);
        this.editSample = undefined;
      };
    }
  };
});
