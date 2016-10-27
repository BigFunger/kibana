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
      this.sections = {
        documents: {
          title: 'Documents'
        },
        processors: {
          title: 'Processors'
        }
      };

      this.section = this.sections.documents;
    }
  };
});
