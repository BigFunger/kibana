import uiModules from 'ui/modules';
import _ from 'lodash';
import '../../styles/_pipeline_input.less';
import template from '../../views/input/pipeline_input_wrapper.html';
const app = uiModules.get('kibana');

app.directive('pipelineInputWrapper', function () {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'inputWrapper',
    controller: function ($scope) {
      this.mode = 'menu';
    }
  };
});
