import uiModules from 'ui/modules';
import template from './processor_ui_grok.html';
import './grok_pattern_definitions';
import './processor_ui_grok.less';
import { pipelines as docLinks } from 'ui/documentation_links/documentation_links';

const app = uiModules.get('pipelines');

//scope.processorShell is attached by the processorDetail directive.
app.directive('processorUiGrok', function () {
  return {
    restrict: 'E',
    template: template,
    controller : function ($scope) {
      $scope.processor = $scope.processorShell.processor;
      const pipeline = $scope.processorShell.pipeline;

      $scope.advancedSection = {
        collapsed: true
      };

      $scope.docLinks = docLinks;
      $scope.$watch('processor.field', () => { pipeline.setDirty(); });
      $scope.$watchCollection('processor.patterns', () => { pipeline.setDirty(); });
      $scope.$watch('processor.traceMatch', () => { pipeline.setDirty(); });
      $scope.$watchCollection('processor.patternDefinitions', () => { pipeline.setDirty(); }, true);
      $scope.$watch('processor.ignoreMissing', () => { pipeline.setDirty(); });
    }
  };
});
