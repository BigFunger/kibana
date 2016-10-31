import { get } from 'lodash';
import uiModules from 'ui/modules';
import jsondiffpatch from '@bigfunger/jsondiffpatch';
import './processor_output.less';
import template from './processor_output.html';
import processorStates from 'ui/pipelines/constants/processor_states';

const htmlFormat = jsondiffpatch.formatters.html.format;

const app = uiModules.get('kibana');

app.directive('processorOutput', function (debounce) {
  return {
    restrict: 'E',
    template: template,
    scope: {
      processorShell: '=',
      pipeline: '='
    },
    link: function ($scope, $el) {
      const div = $el.find('.visual')[0];
      $scope.processorStates = processorStates;

      const diffpatch = jsondiffpatch.create({
        arrays: {
          detectMove: false
        },
        textDiff: {
          minLength: 120
        }
      });

      //TODO: Change this so that it calculates both the document and meta differences at the same time.
      const updateOutput = debounce(() => {
        const processorShell = $scope.processorShell;
        const showMeta = $scope.showMeta;
        const oldValue = get(processorShell.inputObject, showMeta ? 'meta' : 'doc');
        const newValue = get(processorShell.outputObject, showMeta ? 'meta' : 'doc');

        let delta = diffpatch.diff(oldValue, newValue);
        if (!delta || processorShell.error) delta = {};

        div.innerHTML = htmlFormat(delta, oldValue);
      }, 200);

      $scope.$watch('processorShell.outputObject', updateOutput);
      $scope.$watch('processorShell.inputObject', updateOutput);
      $scope.$watch('showMeta', updateOutput);

      $scope.$watch('processorShell', () => {
        $scope.showMeta = false;
        $scope.showChanges = true;
        updateOutput();
      });
    }
  };
});
