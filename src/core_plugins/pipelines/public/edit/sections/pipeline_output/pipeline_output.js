import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './pipeline_output.html';
import './pipeline_output.less';

const app = uiModules.get('pipelines');

app.directive('pipelineOutput', function () {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'pipelineOutput',
    controller: function ($scope) {
      this.pipeline = $scope.pipeline;

      $scope.$watch('pipelineOutput.pipeline.output', () => {
        const outputObject = this.pipeline.output;

        this.docStates = {
          oldValue:  _.get(outputObject, 'doc'),
          newValue: _.get(outputObject, 'doc')
        };
        this.metaStates = {
          oldValue:  _.get(outputObject, 'meta'),
          newValue: _.get(outputObject, 'meta')
        };
      });
    }
  };
});
