import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './pipeline_input.html';
import './pipeline_input.less';

const app = uiModules.get('kibana');

app.directive('pipelineInput', function () {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'pipelineInput',
    controller: function ($scope) {
      this.pipeline = $scope.pipeline;

      $scope.$watch('pipelineInput.pipeline.output', () => {
        const inputObject = this.pipeline.sampleCollection.getCurrentSample();

        this.docStates = {
          oldValue:  _.get(inputObject, 'doc'),
          newValue: _.get(inputObject, 'doc')
        };
        this.metaStates = {
          oldValue:  _.get(inputObject, 'meta'),
          newValue: _.get(inputObject, 'meta')
        };
      });
    }
  };
});
