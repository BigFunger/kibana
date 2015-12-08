const app = require('ui/modules').get('kibana');
const _ = require('lodash');
const $ = require('jquery');

app.directive('pipelineSetup', function ($compile) {
  return {
    restrict: 'E',
    template: require('../views/pipeline-setup.html'),
    link: function ($scope, $el) {
      const $container = $el;
      $el = $('<ul>').appendTo($container);

      $scope.$watchCollection('processors', function (processors) {
        console.log(processors);
        processors.map((processor) => {
          addProcessor(processor);
        });
      });

      function addProcessor(processor) {
        processor.$scope = $scope.$new();
        processor.$scope.processor = processor;

        processor.$el = $compile(`<li>${processor.template}</li>`)(processor.$scope);
        processor.$el.appendTo($el);
      }

      function removeProcessor(processor) {
        // destroy the scope
        processor.$scope.$destroy();

        processor.$el.removeData('panel');
        processor.$el.removeData('$scope');
      }
    },
    controller: function ($scope, AppState) {
      let processors = [];

      processors.push({
        type: 'grok',
        data: {
          field: '_raw',
          pattern: '%{@timestamp} - - %{GREEDYDATA:text}'
        },
        template: '<h1>I am a grok processor</h1>'
        //template: '<pipeline-grok></pipeline-grok>'
      });

      processors.push({
        type: 'kv',
        data: {
          field: 'message',
          separator: '=',
          stringDelimiter: '"'
        },
        template: '<h1>I am a kv processor</h1>',
        //template: '<pipeline-kv></pipeline-kv>'
      });

      processors.push({
        type: 'geoip',
        data: {
          field: 'src'
        },
        template: '<h1>I am a geoip processor</h1>',
        //template: '<pipeline-geoip></pipeline-geoip>'
      });

      processors.push({
        type: 'date',
        data: {
          field: '@timestamp',
          pattern: 'MM/dd/yyyy'
        },
        template: '<h1>I am a date processor</h1>',
        //template: '<pipeline-date></pipeline-date>'
      });

      $scope.processors = processors;

      $scope.addSomething = function() {
        $scope.processors.push({
          type: 'geoip',
          data: {
            field: 'src'
          },
          template: '<h1>I am a geoip processor</h1>',
          //template: '<pipeline-geoip></pipeline-geoip>'
        });
      }
    }
  };
});
