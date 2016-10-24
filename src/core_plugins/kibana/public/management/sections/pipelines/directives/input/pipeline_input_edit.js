import uiModules from 'ui/modules';
import _ from 'lodash';
import '../../styles/_pipeline_input.less';
import template from '../../views/input/pipeline_input_edit.html';
import 'ace';
import angular from 'angular';
import { Sample } from 'ui/pipelines/sample_collection/view_model';

const app = uiModules.get('kibana');

app.directive('pipelineInputEdit', function ($timeout) {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'inputEdit',
    link: function ($scope, $el, attr) {
      $scope.$watch('inputWrapper.mode', (mode) => {
        if (mode === 'edit') {
          $timeout(() => {
            $scope.inputEdit.editor.focus();
          });
        }
      });
    },
    controller: function ($scope) {
      this.sample = undefined;

      $scope.aceLoaded = (editor) => {
        this.editor = editor;
        editor.$blockScrolling = Infinity;
      };

      this.save = () => {
        $scope.pipeline.sampleCollection.replace(this.sample, this.editSample);
        $scope.pipeline.sampleCollection.setCurrent(this.editSample);

        this.sample = undefined;
        $scope.inputWrapper.mode = 'menu';
      };

      this.cancel = () => {
        $scope.inputWrapper.mode = 'menu';
      };

      $scope.$watch('inputEdit.sample', () => {
        this.editSample = new Sample(this.sample);
      });
    }
  };
});
