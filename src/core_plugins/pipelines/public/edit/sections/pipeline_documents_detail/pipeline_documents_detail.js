import uiModules from 'ui/modules';
import template from './pipeline_documents_detail.html';
import './pipeline_documents_detail.less';
import 'ace';

const app = uiModules.get('pipelines');

app.directive('pipelineDocumentsDetail', function ($timeout) {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'documentDetail',
    link: function ($scope, $el, attr) {
      $scope.$watch('pipelineDocuments.editSample', (sample) => {
        $scope.documentDetail.editSample = sample;

        $timeout(() => {
          $scope.documentDetail.editor.focus();
        });
      });
    },
    controller: function ($scope) {
      $scope.aceLoaded = (editor) => {
        this.editor = editor;
        editor.$blockScrolling = Infinity;
      };
    }
  };
});
