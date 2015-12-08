const app = require('ui/modules').get('kibana');
const _ = require('lodash');
const $ = require('jquery');

require('./processor_grok');

app.directive('pipelineSetup', function ($compile) {
  return {
    restrict: 'E',
    template: require('../views/pipeline_setup.html'),
    link: function ($scope, $el) {
      const $container = $el;
      $el = $('<ul>').appendTo($container);

      $scope.$watchCollection('processors', function (processors) {
        const currentProcessors = getCurrentProcessors();

        // processors that are now missing from the processors array
        var removed = _.difference(currentProcessors, processors);

        // processors that have been added
        var added = _.difference(processors, currentProcessors);

        if (removed.length) removed.forEach(removeProcessor);
        if (added.length) added.forEach(addProcessor);
      });

      function getCurrentProcessors() {
        let currentProcessors = [];
        $el.find('li').each((index, li) => {
          const processor = $(li).data('processor');
          currentProcessors.push(processor)
        });

        return currentProcessors;
      }

      function addProcessor(processor) {
        processor.$scope = $scope.$new();
        processor.$scope.processor = processor;

        processor.$el = $compile(`<li>${processor.template}</li>`)(processor.$scope);
        processor.$el.appendTo($el);

        processor.$el.data('processor', processor);
        processor.$el.data('$scope', processor.$scope);
      }

      function removeProcessor(processor) {
        // destroy the scope
        processor.$scope.$destroy();

        processor.$el.removeData('processor');
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
        template: '<processor-grok></processor-grok>'
      });

      // processors.push({
      //   type: 'kv',
      //   data: {
      //     field: 'message',
      //     separator: '=',
      //     stringDelimiter: '"'
      //   },
      //   template: '<h1>I am a kv processor</h1>',
      //   //template: '<pipeline-kv></pipeline-kv>'
      // });

      // processors.push({
      //   type: 'geoip',
      //   data: {
      //     field: 'src'
      //   },
      //   template: '<h1>I am a geoip processor</h1>',
      //   //template: '<pipeline-geoip></pipeline-geoip>'
      // });

      // processors.push({
      //   type: 'date',
      //   data: {
      //     field: '@timestamp',
      //     pattern: 'MM/dd/yyyy'
      //   },
      //   template: '<h1>I am a date processor</h1>',
      //   //template: '<pipeline-date></pipeline-date>'
      // });

      $scope.processors = processors;


      //var index = 3;
      $scope.addSomething = function() {
        //index += 1;
        //if (index > 3) index = 0;
        let index = 0;

        var newProcessor = _.cloneDeep(processors[index]);

        $scope.processors.push(newProcessor);
      }
    }
  };
});
