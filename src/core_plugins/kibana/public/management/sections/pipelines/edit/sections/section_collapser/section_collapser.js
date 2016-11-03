import uiModules from 'ui/modules';
import template from './section_collapser.html';
import './section_collapser.less';

const app = uiModules.get('kibana');

app.directive('sectionCollapser', function ($compile) {
  return {
    restrict: 'E',
    template: template,
    scope: {
      title: '@',
      section: '='
    },
    controller: function ($scope) {
      $scope.title = $scope.title || 'Advanced Options';
      $scope.section = $scope.section || {};
      $scope.section.collapsed = !!$scope.section.collapsed;

      $scope.toggle = () => {
        $scope.section.collapsed = !$scope.section.collapsed;
      };
    }
  };
});
