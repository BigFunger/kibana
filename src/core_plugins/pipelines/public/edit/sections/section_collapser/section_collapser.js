import uiModules from 'ui/modules';
import template from './section_collapser.html';
import './section_collapser.less';

const app = uiModules.get('pipelines');

app.directive('sectionCollapser', function ($compile) {
  return {
    restrict: 'E',
    template: template,
    scope: {
      title: '@',
      collapsed: '='
    },
    controllerAs: 'sectionCollapser',
    bindToController: true,
    controller: function ($scope) {
      this.title = this.title || 'Advanced Options';
      this.collapsed = !!this.collapsed;

      this.toggle = () => {
        this.collapsed = !this.collapsed;
      };
    }
  };
});
