import management from 'ui/management';
import modules from 'ui/modules';
import routes from 'ui/routes';
import template from '../views/pipeline_edit.html';
import IngestProvider from 'ui/ingest';
import Pipeline from '../lib/pipeline';
import saveTemplate from '../partials/_pipeline_save.html';
import '../styles/_pipeline_edit.less';
import './pipeline_output';
import './source_data';
import './processor_ui_container';
import './processor_select';
import './processor_id';
import './processor_input';
import './field_select';
import './pipeline_details';
import './failure_action';
import './pipeline_input';
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
    controller: function ($scope, $route, kbnUrl, Private, Notifier) {
      const ingest = Private(IngestProvider);
      const notify = new Notifier({ location: `Ingest Pipeline Setup` });
      $scope.pipeline = $route.current.locals.pipeline;

      $scope.topNavOpts = {
        pipeline: $scope.pipeline,
        doSave: () => {
          const pipeline = $scope.pipeline;

          return ingest.pipeline.save(pipeline.model)
          .then((result) => {
            notify.info(`Pipeline '${pipeline.pipelineId}' saved!`);
            $scope.kbnTopNav.close();
          })
          .catch(notify.error);
        }
      };

      $scope.topNavMenu = [{
        key: 'save',
        template: saveTemplate,
        description: 'Save Pipeline'
      },
      {
        key: 'close',
        description: 'Cancel Unsaved Changes',
        run: function () { kbnUrl.change('/management/elasticsearch/pipelines', {}); }
      }];
    }
  };
});
