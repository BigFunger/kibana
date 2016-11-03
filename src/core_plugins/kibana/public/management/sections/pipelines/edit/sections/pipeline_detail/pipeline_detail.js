import _ from 'lodash';
import angular from 'angular';
import uiModules from 'ui/modules';
import template from './pipeline_detail.html';
import './pipeline_detail.less';

const app = uiModules.get('kibana');

app.directive('pipelineDetail', function ($compile) {
  return {
    restrict: 'E',
    template: template,
    scope: {
      pipeline: '=',
      processorShell: '='
    },
    controller: function ($scope) {
      function updateInputs() {
        const processorShell = $scope.processorShell;
        const pipeline = $scope.pipeline;

        if (processorShell) {
          $scope.title = `${processorShell.processor.title} ${processorShell.description}`;
          $scope.inputObject = processorShell.inputObject;
          $scope.outputObject = processorShell.outputObject;
        } else {
          const currentSample = pipeline.sampleCollection.getCurrentSample();
          $scope.title = 'Entire Pipeline';

          $scope.inputObject = currentSample;
          $scope.outputObject = pipeline.output;
        }
      }

      $scope.$watch('processorShell', e => { updateInputs(); });
      $scope.$watch('pipeline.output', e => { updateInputs(); });
      //$scope.$watch('pipeline.sampleCollection.getCurrentSample()', e => { updateInputs(); });


      $scope.inputSection = { collapsed: true };
      $scope.inputOptions = {
        document: {
          title: 'Document'
        },
        meta: {
          title: 'Metadata'
        }
      };
      $scope.currentInputOption = $scope.inputOptions.document;

      $scope.outputSection = { collapsed: false };
      $scope.outputOptions = {
        document: {
          title: 'Document'
        },
        meta: {
          title: 'Metadata'
        }
      };
      $scope.currentOutputOption = $scope.outputOptions.document;
    }
  };
});
