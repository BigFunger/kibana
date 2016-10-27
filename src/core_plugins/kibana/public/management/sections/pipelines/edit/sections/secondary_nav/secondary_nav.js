import modules from 'ui/modules';
import template from './secondary_nav.html';
import './secondary_nav.less';

const app = modules.get('apps/management');

app.directive('secondaryNav', function () {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'secondaryNav',
    controller: function ($scope) {
      this.sections = {
        processorDetails: {
          title: 'Processor Details'
        },
        pipelineOutput: {
          title: 'Pipeline Output'
        }
      };

      this.section = this.sections.processorDetails;
    }
  };
});
