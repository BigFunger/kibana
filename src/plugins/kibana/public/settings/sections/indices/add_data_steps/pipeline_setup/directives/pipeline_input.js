import uiModules from 'ui/modules';
import _ from 'lodash';
import '../styles/_pipeline_input.less';
import template from '../views/pipeline_input.html';

const app = uiModules.get('kibana');

app.directive('pipelineInput', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      pipeline: '=',
      samples: '=',
      sample: '='
    },
    controller: function ($scope) {
      if (_.isUndefined($scope.rawSample)) {
        $scope.rawSample = '';
      }

      $scope.$watch('rawSample', (newValue) => {
        const splitRawSamples = newValue.split('\n');

        $scope.samples = _.map(splitRawSamples, (sample) => {
          try {
            return JSON.parse(sample);
          }
          catch (error) {
            return { message: sample };
          }
        });
      });
    }
  };
});
