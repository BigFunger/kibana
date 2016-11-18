import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './pipeline_output.html';
import './pipeline_output.less';

const app = uiModules.get('kibana');

app.directive('pipelineOutput', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      pipeline: '='
    },
    controllerAs: 'pipelineOutput',
    bindToController: true,
    controller: function ($scope) {
      this.options = {
        document: {
          title: 'Document'
        },
        meta: {
          title: 'Metadata'
        }
      };
      this.currentOption = this.options.document;

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
