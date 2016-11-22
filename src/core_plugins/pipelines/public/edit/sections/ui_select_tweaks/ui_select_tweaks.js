import uiModules from 'ui/modules';

const app = uiModules.get('pipelines');

app.directive('uiSelectTweaks', function ($timeout) {
  return {
    restrict: 'A',
    link: function ($scope, $el) {
      $timeout(() => {
        $el.find('.ui-select-toggle').removeClass('btn btn-default');
      });

      $scope.$watch('$select.open', function (isOpen) {
        if (isOpen) {
          $scope.$select.search = $scope.$select.selected;
        }
      });
    }
  };
});
