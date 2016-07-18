import management from 'ui/management';
import modules from 'ui/modules';
import routes from 'ui/routes';
import template from '../views/pipeline_edit.html';
import './pipeline_output';
import './source_data';
import './processor_ui_container';
import './processor_select';
import './field_select';
import './pipeline_details';
import './failure_action';
import './pipeline_input';
import './processor_input';
import './pipeline_crud';
import './set_focus';
import './pipeline_setup';
import './pipeline_header';
import './pipeline_on_failure';
import '../processors';

const app = modules.get('apps/management');

app.directive('pipelineEdit', function () {
  return {
    restrict: 'E',
    template: template,
    controller: function ($scope, $route) {
      $scope.pipeline = $route.current.locals.pipeline;
    }
  };
});
