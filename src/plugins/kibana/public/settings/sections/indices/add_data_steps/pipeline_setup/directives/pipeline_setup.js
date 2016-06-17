import uiModules from 'ui/modules';
import _ from 'lodash';
import Pipeline from '../lib/pipeline';
import ProcessorCollection from '../lib/processor_collection';
import angular from 'angular';
import IngestProvider from 'ui/ingest';
import '../styles/_pipeline_setup.less';
import './pipeline_output';
import './source_data';
import './processor_ui_container';
import './processor_select';
import './field_select';
import './set_focus';
import '../processors';
import template from '../views/pipeline_setup.html';

import * as ProcessorTypes from '../processors/view_models';
window.ProcessorCollection = ProcessorCollection;
window.ProcessorTypes = ProcessorTypes;

const app = uiModules.get('kibana');

app.directive('pipelineSetup', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      samples: '=',
      pipeline: '='
    },
    controller: function ($scope, debounce, Private, Notifier) {
      const ingest = Private(IngestProvider);
      const notify = new Notifier({ location: `Ingest Pipeline Setup` });
      $scope.sample = {};

      const pipeline = new Pipeline();
      // Loads pre-existing pipeline which will exist if the user returns from
      // a later step in the wizard
      if ($scope.pipeline) {
        pipeline.load($scope.pipeline);
        $scope.sample = $scope.pipeline.input;
      }
      $scope.pipeline = pipeline;
      $scope.activeProcessorCollection = pipeline.processorCollection;

      //initiates the simulate call if the pipeline is dirty
      const simulatePipeline = debounce((event, message) => {
        if (pipeline.processorCollection.processors.length === 0) {
          pipeline.updateOutput();
          return;
        }

        return ingest.simulate(pipeline.model)
        .then((results) => { pipeline.applySimulateResults(results); })
        .catch(notify.error);
      }, 200);

      $scope.$watchCollection('activeProcessorCollection.processors', (newVal, oldVal) => {
        $scope.activeProcessorCollection.updateParents();
        pipeline.dirty = true;
      });

      $scope.$watch('sample', (newVal) => {
        //pipeline.input = $scope.sample;

        //if the sample changes, we want to propegate the update through the entire pipeline,
        //and not just the current processorCollection we're focussed on. (need to make sure that updateParents
        //is recursive.)
        pipeline.input = $scope.sample;
        pipeline.processorCollection.updateParents(pipeline.input);
        pipeline.dirty = true;
      });

      $scope.$watch('processorType', processorType => {
        if (!processorType) return;

        $scope.activeProcessorCollection.add(processorType);
        //pipeline.add(processorType);
        $scope.processorType = null;
      });

      $scope.$watch('pipeline.dirty', simulatePipeline);

      $scope.expandContext = 1;




      $scope.jimFields = [
        'field1',
        'field2',
        'field3'
      ];

      $scope.$watch('jimField', (newVal) => {
        //console.log(`jimField=${newVal}`);
      });
    }
  };
});
