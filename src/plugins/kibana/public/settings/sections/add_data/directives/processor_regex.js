const app = require('ui/modules').get('kibana');
const _ = require('lodash');
const $ = require('jquery');
const keysDeep = require('../lib/keys_deep.js');

app.directive('processorRegex', function () {
  return {
    restrict: 'E',
    template: require('../views/processor_regex.html'),
    controller: function ($scope) {
      $scope.expression = '';

      $scope.$watch('inputObject', refreshFields);
      $scope.$watch('field', refreshFieldData);
      $scope.$watch('targetField', refreshOutput);
      $scope.$watch('fieldData', refreshOutput);
      $scope.$watch('expression', refreshOutput);

      function refreshFields() {
        $scope.fields = keysDeep($scope.inputObject);
        $scope.field = $scope.fields[0];
      }

      function refreshFieldData(field) {
        $scope.fieldData = _.get($scope.inputObject, field);
      }

      function refreshOutput() {
        const regex = new RegExp($scope.expression, 'i');
        const matches = $scope.fieldData.match(regex)

        const processorOutput = {};
        if ($scope.targetField && matches && matches[0]) {
          _.set(processorOutput, $scope.targetField, matches[0]);
        }

        $scope.outputObject = _.defaultsDeep(processorOutput, $scope.inputObject);
      }
    }
  };
});
