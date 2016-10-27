import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './processor_tree_header.html';
import './processor_tree_header.less';

const app = uiModules.get('kibana');

app.directive('processorTreeHeader', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      processorCollection: '=',
      title: '@'
    },
    controller: function ($scope) {
      $scope.addProcessor = () => {
        alert('add a processor');
      };
    }
  };
});
