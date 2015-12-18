const app = require('ui/modules').get('kibana');
const _ = require('lodash');

app.directive('sourceData', function () {
  return {
    restrict: 'E',
    scope: {
      outputObject: '='
    },
    template: require('../views/source_data.html'),
    controller: function ($scope, debounce) {
      $scope.inputText =
`{
"_raw": "11/24/2015 - - src=1.1.1.1 evil=1",
"_deal": "I am a simple string"
}`;

      function updateSourceObject() {
        try {
          let newObj = JSON.parse($scope.inputText);
          $scope.outputObject = JSON.parse($scope.inputText);
        } catch(er) { }
      }
      updateSourceObject = debounce(updateSourceObject, 200);

      $scope.$watch('inputText', function() {
        updateSourceObject();
      });
    }
  };
});
