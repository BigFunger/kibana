const app = require('ui/modules').get('kibana');
const _ = require('lodash');
const $ = require('jquery');
const keysDeep = require('../lib/keys_deep');
const cleanDeep = require('../lib/clean_deep');
require('./processor_header');

app.directive('processorRegex', function () {
  return {
    restrict: 'E',
    template: require('../views/processor_regex.html'),
    controller: function ($scope, debounce) {

      //this occurs when the parent processor changes it's output object,
      //which means that this processor's input object is changing.
      function refreshFields() {
        $scope.outputObject = _.cloneDeep($scope.inputObject);
        $scope.fields = keysDeep($scope.inputObject);

        if (!_.contains($scope.fields, $scope.sourceField)) {
          $scope.sourceField = $scope.fields[0];
        }
        refreshFieldData();
      }

      function refreshFieldData() {
        $scope.fieldData = _.get($scope.inputObject, $scope.sourceField);
        refreshOutput();
      }
      refreshFieldData = debounce(refreshFieldData, 100);

      function getProcessorOutput() {
        const processorOutput = {};

        if ($scope.expression && $scope.targetField) {
          let matches = [];
          try {
            const regex = new RegExp($scope.expression, 'i');
            matches = $scope.fieldData.match(regex);
          } catch(err) {}

          if (matches && matches[0]) {
            _.set(processorOutput, $scope.targetField, matches[0]);
          } else {
            _.set(processorOutput, $scope.targetField, '');
          }
        }

        return processorOutput;
      }

      function removeDirtyProperties() {
        let inputKeys = keysDeep($scope.inputObject);
        let outputKeys = keysDeep($scope.outputObject);

        var added = _.difference(outputKeys, inputKeys);
        added.forEach((key) => {
          _.set($scope.outputObject, key, undefined);
        });
        cleanDeep($scope.outputObject);
      }

      function refreshOutput() {
        removeDirtyProperties();

        const processorOutput = getProcessorOutput();

        keysDeep(processorOutput).forEach((key) => {
          _.set($scope.outputObject, key, _.get(processorOutput, key));
        });

        if ($scope.onlyShowNewFields) {
          $scope.outputDisplayObject = processorOutput;
        } else {
          $scope.outputDisplayObject = $scope.outputObject;
        }
      }
      refreshOutput = debounce(refreshOutput, 200);

      $scope.expression = '^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}';
      //$scope.outputObject = _.cloneDeep($scope.inputObject);

      $scope.$watch('sourceField', refreshFieldData);
      $scope.$watch('targetField', refreshOutput);
      $scope.$watch('fieldData', refreshOutput);
      $scope.$watch('expression', refreshOutput);
      $scope.$watch('onlyShowNewFields', refreshOutput);

      $scope.$watchCollection('inputObject', refreshFields);
    }
  };
});

//   ^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}
