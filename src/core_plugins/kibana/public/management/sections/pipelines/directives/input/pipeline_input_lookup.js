import uiModules from 'ui/modules';
import _ from 'lodash';
import '../../styles/_pipeline_input.less';
import selectedTemplate from '../../partials/_pipeline_inputs_menu_selected.html';
import statusTemplate from '../../partials/_pipeline_inputs_menu_status.html';
import sampleTemplate from '../../partials/_pipeline_inputs_menu_sample.html';
import { Sample } from 'ui/pipelines/sample_collection/view_model';

import template from '../../views/input/pipeline_input_lookup.html';
import angular from 'angular';

const app = uiModules.get('kibana');

app.directive('pipelineInputLookup', function ($timeout) {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'inputLookup',
    controller: function ($scope) {
      const sampleCollection = $scope.pipeline.sampleCollection;
      $scope.states = Sample.states;

      this.cancel = () => {
        $scope.inputWrapper.mode = 'menu';
      };

      this.selectSample = () => {

      };

      const buildRows = () => {
        $scope.rows = _.map(sampleCollection.samples, (sample, index) => {
          const rowScope = _.assign($scope.$new(), {
            index: index,
            sample: sample,
            buildRows: buildRows,
            selectSample: this.selectSample
          });

          return [
            {
              markup: selectedTemplate,
              scope: rowScope
            },
            {
              markup: statusTemplate,
              scope: rowScope,
              value: sample.state
            },
            {
              markup: sampleTemplate,
              scope: rowScope,
              value: sample.description || sample.doc
            }
          ];
        });
      };

      $scope.columns = [
        {title: '', sortable: false},
        {title: 'Status'},
        {title: 'Sample'}
      ];

      $scope.$watchCollection('sampleCollection.samples', () => {
        buildRows();
      });
    }
  };
});
