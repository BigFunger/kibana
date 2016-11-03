import uiModules from 'ui/modules';
import jsondiffpatch from '@bigfunger/jsondiffpatch';
import { get } from 'lodash';
import template from './document_viewer.html';
import './document_viewer.less';

const htmlFormat = jsondiffpatch.formatters.html.format;
const app = uiModules.get('kibana');

app.directive('documentViewer', function ($timeout) {
  return {
    restrict: 'E',
    template: template,
    scope: {
      states: '='
    },
    link: function ($scope, $el, attrs) {
      const div = $el.find('.visual')[0];

      const diffpatch = jsondiffpatch.create({
        arrays: {
          detectMove: false
        },
        textDiff: {
          minLength: 120
        }
      });

      $scope.$watch('states', (newStates) => {
        const oldValue = get(newStates, 'oldValue');
        const newValue = get(newStates, 'newValue');

        let delta = diffpatch.diff(oldValue, newValue);
        if (!delta) delta = {};

        div.innerHTML = htmlFormat(delta, oldValue);
      });
    }
  };
});
