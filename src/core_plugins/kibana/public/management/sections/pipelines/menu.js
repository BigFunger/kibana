import management from 'ui/management';
import routes from 'ui/routes';
import IngestProvider from 'ui/ingest';
import Pipeline from './lib/pipeline';
import template from './views/menu_app.html';
import './directives/pipeline_menu';

routes
.when('/management/elasticsearch/pipelines', {
  template: template,
  resolve: {
    pipelines: function ($route, Private, Notifier, courier) {
      const ingest = Private(IngestProvider);
      const notify = new Notifier({ location: `Management - Pipelines` });

      return ingest.pipelines.load()
      .then((result) => {
        return result;
      })
     .catch(notify.error);
    }
  }
});
