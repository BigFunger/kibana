const app = require('ui/modules').get('kibana');
const _ = require('lodash');
const $ = require('jquery');
const keysDeep = require('../lib/keys_deep.js');

app.directive('processorGrok', function () {
  return {
    restrict: 'E',
    template: require('../views/processor_grok.html'),
    controller: function ($scope) {
      //TODO: this needs to come from outside this directive.
      $scope.inputObject = {
        '_raw': '11/24/2015 - - src=1.1.1.1 evil=1',
        'otherField': 'meow meow meow',
        'nested': {
          'field1': 'value1',
          'field2': 'value2'
        }
      };

      $scope.fields = keysDeep($scope.inputObject);
      $scope.field = $scope.fields[0];
      $scope.pattern = '';

      $scope.$watch('field', refreshFieldData);
      $scope.$watch('fieldData', refreshOutput);
      $scope.$watch('pattern', refreshOutput);

      function refreshFieldData(field) {
        $scope.fieldData = _.get($scope.inputObject, field);
      }

      let evilCounter = 0;
      function refreshOutput() {
        evilCounter += 1;

        $scope.outputObject = {
          '@timestamp': '11/24/2015',
          'message': 'src=1.1.1.1 evil=1',
          'counter': evilCounter
        };
      }
    }
  };
});
