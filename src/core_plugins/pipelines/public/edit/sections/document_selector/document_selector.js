import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './document_selector.html';
import './document_selector.less';

const app = uiModules.get('pipelines');

app.directive('documentSelector', function () {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'documentSelector',
    controller: function ($scope) {
      const sampleCollection = $scope.pipeline.sampleCollection;

      this.previousSample = () => {
        let newIndex = sampleCollection.index - 1;
        if (newIndex === -1) newIndex = sampleCollection.samples.length - 1;

        sampleCollection.index = newIndex;
      };

      this.nextSample = () => {
        let newIndex = sampleCollection.index + 1;
        if (newIndex === sampleCollection.samples.length) newIndex = 0;

        sampleCollection.index = newIndex;
      };
    }
  };
});
