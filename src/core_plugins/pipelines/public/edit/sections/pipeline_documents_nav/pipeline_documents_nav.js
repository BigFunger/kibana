import uiModules from 'ui/modules';
import template from './pipeline_documents_nav.html';
import './pipeline_documents_nav.less';

const app = uiModules.get('pipelines');

app.directive('pipelineDocumentsNav', function () {
  return {
    restrict: 'E',
    template: template,
    controller: function ($scope) {
    }
  };
});
