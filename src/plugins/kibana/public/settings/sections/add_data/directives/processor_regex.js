const app = require('ui/modules').get('kibana');
const _ = require('lodash');
const $ = require('jquery');
const keysDeep = require('../lib/keys_deep');
require('./processor_header');

app.directive('processorRegex', function () {
  return {
    restrict: 'E',
    template: require('../views/processor_regex.html'),
    controller: function ($scope) {
      $scope.expression = '';

      $scope.$watch('inputObject', refreshFields);
      $scope.$watch('sourceField', refreshFieldData);
      $scope.$watch('targetField', refreshOutput);
      $scope.$watch('fieldData', refreshOutput);
      $scope.$watch('expression', refreshOutput);

      function refreshFields() {
        $scope.fields = keysDeep($scope.inputObject);
        $scope.sourceField = $scope.fields[0];
      }

      function refreshFieldData(field) {
        $scope.fieldData = _.get($scope.inputObject, field);
      }

      function refreshOutput() {
        const regex = new RegExp($scope.expression, 'i');
        const matches = $scope.fieldData.match(regex)

        const processorOutput = {};
        if ($scope.targetField) {
          if (matches && matches[0]) {
            _.set(processorOutput, $scope.targetField, matches[0]);
          } else {
            _.set(processorOutput, $scope.targetField, '');
          }
        }

        const newProperties = _.cloneDeep(processorOutput);
        $scope.outputObject = _.defaultsDeep(processorOutput, $scope.inputObject);

        //show the merged object
        //$scope.outputDisplayObject = $scope.outputObject;

        //show just the new properties
        $scope.outputDisplayObject = newProperties;


        //   ^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}
      }
    }
  };
});
