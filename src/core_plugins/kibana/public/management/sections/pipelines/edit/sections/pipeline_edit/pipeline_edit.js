import modules from 'ui/modules';
import template from './pipeline_edit.html';
import PipelinesProvider from 'ui/pipelines';
import slugifyId from 'ui/utils/slugify_id';
import saveTemplate from './save_partial.html';
import './pipeline_edit.less';

const app = modules.get('apps/management');

app.directive('pipelineEdit', function () {
  return {
    restrict: 'E',
    template: template,
    controller: function ($scope, $rootScope, $route, kbnUrl, Private, Notifier) {
      const pipelines = Private(PipelinesProvider);
      const notify = new Notifier({ location: `Ingest Pipeline Setup` });
      $scope.pipeline = $route.current.locals.pipeline;

      $scope.topNavOpts = {
        pipeline: $scope.pipeline,
        doSave: () => {
          const pipeline = $scope.pipeline;
          pipeline.pipelineId = slugifyId(pipeline.pipelineId);

          return pipelines.pipeline.save(pipeline.model)
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
        key: 'options',
        template: '<h1>OPTIONS!!!</h1>',
        description: 'Do Something With Options'
      },
      {
        key: 'rename',
        template: '<h1>RENAME!!!</h1>',
        description: 'Rename the pipeline for some reason.'
      }];
    }
  };
});
