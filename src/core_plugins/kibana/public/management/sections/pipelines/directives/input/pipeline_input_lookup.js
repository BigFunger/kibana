import uiModules from 'ui/modules';
import _ from 'lodash';
import '../../styles/_pipeline_input.less';
import selectedTemplate from '../../partials/_pipeline_inputs_menu_selected.html';
import statusTemplate from '../../partials/_pipeline_inputs_menu_status.html';
import sampleTemplate from '../../partials/_pipeline_inputs_menu_sample.html';
import { Sample } from 'ui/pipelines/sample_collection/view_model';

import template from '../../views/input/pipeline_input_lookup.html';
import angular from 'angular';

const app = uiModules.get('kibana');

app.directive('pipelineInputLookup', function ($timeout) {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'inputLookup',
    controller: function ($scope) {
      const sampleCollection = $scope.pipeline.sampleCollection;
      $scope.states = Sample.states;

      this.cancel = () => {
        $scope.inputWrapper.mode = 'menu';
      };

      this.save = () => {
        sampleCollection.index = _.parseInt(this.index, 10);
        $scope.inputWrapper.mode = 'menu';
      };

      this.loadSample = (sample) => {
        sampleCollection.setCurrent(sample);
        $scope.inputWrapper.mode = 'menu';
      };

      $scope.$watch('inputWrapper.mode', (mode) => {
        if (mode === 'lookup') {
          this.index = sampleCollection.index;
        }
      });
    }
  };
});
