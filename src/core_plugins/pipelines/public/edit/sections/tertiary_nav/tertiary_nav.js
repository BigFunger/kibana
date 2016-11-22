import uiModules from 'ui/modules';
import template from './tertiary_nav.html';
import './tertiary_nav.less';

const app = uiModules.get('pipelines');

app.directive('tertiaryNav', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      options: '=',
      option: '='
    },
    controllerAs: 'tertiaryNav',
    bindToController: true,
    controller: function ($scope) {
      this.option = this.option || this.options[0];
    }
  };
});
