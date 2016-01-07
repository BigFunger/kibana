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
      function refreshFieldData() {
        $scope.fieldData = _.get($scope.inputObject, $scope.sourceField);
        refreshOutput();
      }
      refreshFieldData = debounce(refreshFieldData, 100);

      function getProcessorOutput() {
        let newObj = {};
        try {
          newObj = JSON.parse($scope.inputText);
        } catch(er) {
          return undefined;
        }

        return newObj
      }

      function refreshOutput() {
        const newOutput = getProcessorOutput();

        if (newOutput) {
          $scope.outputObject = getProcessorOutput();
        }
      }
      refreshOutput = debounce(refreshOutput, 200);

      $scope.inputText =
`{
"_raw": "11/24/2015 - - src=2607:f8b0:400d:c07::67 tar=172.15.95.62 evil=1"
}`;
      $scope.inputObject = _.cloneDeep($scope.outputObject);
      $scope.$watch('inputText', refreshOutput);
    }
  };
});
