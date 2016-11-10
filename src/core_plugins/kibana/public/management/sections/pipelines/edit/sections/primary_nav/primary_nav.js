import modules from 'ui/modules';
import template from './primary_nav.html';
import PipelinesProvider from 'ui/pipelines';
import slugifyId from 'ui/utils/slugify_id';
import './primary_nav.less';

const app = modules.get('apps/management');

app.directive('primaryNav', function () {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'primaryNav',
    controller: function ($scope) {
      const pipeline = $scope.pipeline;

      this.sections = {
        documents: {
          title: 'Documents'
        },
        processors: {
          title: 'Processors'
        }
      };

      if ($scope.pipeline.sampleCollection.samples.length > 0) {
        this.section = this.sections.processors;
      } else {
        this.section = this.sections.documents;
      }

      $scope.$watch('primaryNav.section', (newVal, oldVal) => {
        if (newVal !== oldVal && oldVal === this.sections.documents) {
          $scope.pipelineProcessors.simulate();
        }
      });
    }
  };
});
