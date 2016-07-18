import management from 'ui/management';
import routes from 'ui/routes';
import IngestProvider from 'ui/ingest';
import Pipeline from './lib/pipeline';
import template from './views/edit_app.html';
import saveTemplate from './partials/_pipeline_save.html';
import './directives/pipeline_edit';

routes
.when('/management/elasticsearch/pipeline/:id', {
  template: template,
  resolve: {
    pipeline: function ($route, Private, Notifier) {
      const ingest = Private(IngestProvider);
      const notify = new Notifier({ location: `Management - Pipelines` });

      return ingest.pipeline.load($route.current.params.id)
      .then((result) => {
        return new Pipeline(result);
      })
     .catch(notify.error);
    }
  },
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
      key: 'cancel',
      description: 'Cancel Changes',
      run: function () { kbnUrl.change('/management/elasticsearch/pipelines', {}); }
    }];
  }
});
