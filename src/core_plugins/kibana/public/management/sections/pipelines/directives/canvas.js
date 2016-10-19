import uiModules from 'ui/modules';
import template from '../views/canvas.html';

const app = uiModules.get('kibana');

app.directive('pipelineCanvas', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      pipeline: '='
    },
    controllerAs: 'sidebar',
    link: function ($scope, $ele, args) {
      // const c = $ele.find('canvas')[0];
      // const ctx = c.getContext('2d');
      // ctx.moveTo(0,0);
      // ctx.lineTo(200,100);
      // ctx.stroke();
    },
    controller: function ($scope) {
    }
  };
});
