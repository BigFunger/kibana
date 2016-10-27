import modules from 'ui/modules';
import template from './pipeline_documents_detail.html';
import './pipeline_documents_detail.less';
import 'ace';

const app = modules.get('apps/management');

app.directive('pipelineDocumentsDetail', function () {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'documentDetail',
    controller: function ($scope) {
      $scope.aceLoaded = (editor) => {
        this.editor = editor;
        editor.$blockScrolling = Infinity;
      };

      $scope.$watch('pipelineDocuments.editSample', (sample) => {
        this.editSample = sample;
      });
    }
  };
});
