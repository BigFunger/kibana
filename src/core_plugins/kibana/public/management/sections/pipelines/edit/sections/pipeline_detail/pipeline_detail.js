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

          $scope.inputStatesDoc = {
            oldValue:  _.get($scope.inputObject, 'doc'),
            newValue: _.get($scope.inputObject, 'doc')
          };
          $scope.inputStatesMeta = {
            oldValue:  _.get($scope.inputObject, 'meta'),
            newValue: _.get($scope.inputObject, 'meta')
          };
          $scope.outputStatesDoc = {
            oldValue:  _.get($scope.inputObject, 'doc'),
            newValue: _.get($scope.outputObject, 'doc')
          };
          $scope.outputStatesMeta = {
            oldValue:  _.get($scope.inputObject, 'meta'),
            newValue: _.get($scope.outputObject, 'meta')
          };
        } else {
          const currentSample = pipeline.sampleCollection.getCurrentSample();
          $scope.title = 'Entire Pipeline';
          $scope.inputObject = currentSample;
          $scope.outputObject = pipeline.output;

          $scope.inputStatesDoc = {
            oldValue:  _.get($scope.inputObject, 'doc'),
            newValue: _.get($scope.inputObject, 'doc')
          };
          $scope.inputStatesMeta = {
            oldValue:  _.get($scope.inputObject, 'meta'),
            newValue: _.get($scope.inputObject, 'meta')
          };
          $scope.outputStatesDoc = {
            oldValue:  _.get($scope.outputObject, 'doc'),
            newValue: _.get($scope.outputObject, 'doc')
          };
          $scope.outputStatesMeta = {
            oldValue:  _.get($scope.outputObject, 'meta'),
            newValue: _.get($scope.outputObject, 'meta')
          };
        }
      }

      $scope.$watch('processorShell', e => { updateInputs(); });
      $scope.$watch('pipeline.output', e => { updateInputs(); });

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
