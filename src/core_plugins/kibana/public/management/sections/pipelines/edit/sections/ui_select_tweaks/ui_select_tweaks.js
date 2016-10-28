import uiModules from 'ui/modules';

const app = uiModules.get('kibana');

app.directive('uiSelectTweaks', function ($timeout) {
  return {
    restrict: 'A',
    link: function ($scope, $el) {
      $timeout(() => {
        $scope.$select.setFocus();
      });

      $scope.$watch('$select.open', function (isOpen) {
        if (isOpen) {
          $scope.$select.search = $scope.$select.selected;
        }
      });
    }
  };
});
