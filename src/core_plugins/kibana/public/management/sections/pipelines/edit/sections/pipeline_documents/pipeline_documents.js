import modules from 'ui/modules';
import template from './pipeline_documents.html';
import './pipeline_documents.less';
import { Sample } from 'ui/pipelines/sample_collection/view_model';

const app = modules.get('apps/management');

app.directive('pipelineDocuments', function () {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'pipelineDocuments',
    controller: function ($scope) {
      const sampleCollection = $scope.pipeline.sampleCollection;
      this.editSample = sampleCollection.getCurrentSample();

      this.add = () => {
        const sample = new Sample({ description: 'New Sample', doc: {} });
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
