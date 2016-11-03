import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './processor_tree.html';
import '../recursion_helper/recursion_helper';
import './processor_tree.less';

const app = uiModules.get('kibana');

app.directive('processorTree', function (RecursionHelper) {
  return {
    restrict: 'E',
    template: template,
    scope: {
      processorCollection: '=',
      selectedItemController: '='
    },
    compile: function (element) {
      // Use the compile function from the RecursionHelper,
      // And return the linking function(s) which it returns
      return RecursionHelper.compile(element);
    },
    controller: function ($scope) {
      $scope.allowDeselect = !!$scope.allowDeselect;
    }
  };
});
