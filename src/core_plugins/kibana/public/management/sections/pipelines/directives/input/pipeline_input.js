import uiModules from 'ui/modules';
import { map, isObject } from 'lodash';
import '../../styles/_pipeline_input.less';
import template from '../../views/input/pipeline_input.html';
import modes from '../../lib/constants/pipeline_modes';
import _ from 'lodash';
import { Sample } from 'ui/pipelines/sample_collection/view_model';

const app = uiModules.get('kibana');

app.directive('pipelineInput', function () {
  return {
    restrict: 'E',
    template: template,
    controller: function ($scope) {
      const pipeline = $scope.pipeline;
      const sampleCollection = $scope.sampleCollection = pipeline.sampleCollection;

      $scope.previousSample = () => {
        let newIndex = sampleCollection.index - 1;
        if (newIndex === -1) newIndex = sampleCollection.samples.length - 1;

        sampleCollection.index = newIndex;
      };

      $scope.nextSample = () => {
        let newIndex = sampleCollection.index + 1;
        if (newIndex === sampleCollection.samples.length) newIndex = 0;

        sampleCollection.index = newIndex;
      };

      $scope.jumpToSample = () => {
        $scope.inputWrapper.mode = 'lookup';
      };

      $scope.$watch('sampleCollection.getCurrentSample()', (newVal) => {
        $scope.currentSample = newVal;
        pipeline.input = _.get($scope.currentSample, 'doc');
      });

      $scope.editInput = () => {
        $scope.inputEdit.sample = $scope.sampleCollection.getCurrentSample();
        $scope.inputWrapper.mode = 'edit';
      };
      $scope.addInput = () => {
        $scope.inputEdit.sample = new Sample();
        $scope.inputWrapper.mode = 'edit';
      };
      $scope.cloneInput = () => {
        const currentSample = $scope.sampleCollection.getCurrentSample();
        $scope.inputEdit.sample = new Sample(currentSample);
        $scope.inputWrapper.mode = 'edit';
      };
      $scope.deleteInput = () => {
        const sample = $scope.sampleCollection.getCurrentSample();
        sampleCollection.remove(sample);
      };
    }
  };
});
