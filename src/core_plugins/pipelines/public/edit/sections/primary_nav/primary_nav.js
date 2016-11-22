import uiModules from 'ui/modules';
import template from './primary_nav.html';
import './primary_nav.less';

const app = uiModules.get('pipelines');

app.directive('primaryNav', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      sections: '=',
      section: '='
    },
    controllerAs: 'primaryNav',
    bindToController: true,
    controller: function ($scope) {
    }
  };
});
