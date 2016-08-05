import management from 'ui/management';
import routes from 'ui/routes';
import IngestProvider from 'ui/ingest';
import Pipeline from './lib/pipeline';
import template from './views/edit_app.html';
import './directives/pipeline_edit';
import processorRegistryProvider from 'ui/registry/ingest_processors';

routes
.when('/management/elasticsearch/pipeline/:id', {
  template: template,
  resolve: {
    pipeline: function ($route, Private, Notifier) {
      const ingest = Private(IngestProvider);
      const notify = new Notifier({ location: `Management - Pipelines` });

      const processorRegistry = Private(processorRegistryProvider);
      //console.log('edit.js', processorRegistry);

      return ingest.pipeline.load($route.current.params.id)
      .then((result) => {
        return new Pipeline(processorRegistry, result);
      })
     .catch(notify.error);
    }
  }
})
.when('/management/elasticsearch/pipeline', {
  template: template,
  resolve: {
    pipeline: function (Private) {
      const processorRegistry = Private(processorRegistryProvider);

      return new Pipeline(processorRegistry);
    }
  }
});
