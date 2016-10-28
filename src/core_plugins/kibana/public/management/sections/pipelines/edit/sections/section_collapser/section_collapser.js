import uiModules from 'ui/modules';
import template from './section_collapser.html';
import './section_collapser.less';

const app = uiModules.get('kibana');

app.directive('sectionCollapser', function ($compile) {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'sectionCollapser',
    link: function ($scope, $el, attrs) {
      $scope.sectionCollapser.title = attrs.title || 'Advanced settings';
    },
    controller: function ($scope) {
      this.collapsed = true;

      this.toggle = () => {
        this.collapsed = !this.collapsed;
      };
    }
  };
});
