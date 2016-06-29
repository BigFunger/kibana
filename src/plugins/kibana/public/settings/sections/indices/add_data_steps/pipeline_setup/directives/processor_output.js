import uiModules from 'ui/modules';
import jsondiffpatch from '@bigfunger/jsondiffpatch';
import '../styles/_processor_output.less';
import template from '../views/processor_output.html';

const htmlFormat = jsondiffpatch.formatters.html.format;
const app = uiModules.get('kibana');

app.directive('processorOutput', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      processor: '='
    },
    link: function ($scope, $el) {
      const div = $el.find('.visual')[0];
      const processor = $scope.processor;

      $scope.diffpatch = jsondiffpatch.create({
        arrays: {
          detectMove: false
        },
        textDiff: {
          minLength: 120
        }
      });

      $scope.updateUi = function () {
        let delta = $scope.diffpatch.diff(processor.inputObject, processor.outputObject);
        if (!delta || processor.error || processor.new) delta = {};

        div.innerHTML = htmlFormat(delta, processor.inputObject);
      };
    },
    controller: function ($scope, debounce) {
      $scope.collapsed = false;

      const updateOutput = debounce(function () {
        $scope.updateUi();
      }, 200);

      $scope.$watch('processor.outputObject', updateOutput);
      $scope.$watch('processor.inputObject', updateOutput);
    }
  };
});
