import routes from 'ui/routes';
import { PipelinesProvider } from 'plugins/pipelines/pipelines_service';
import { Pipeline } from 'plugins/pipelines/lib/pipeline';
import processorRegistryProvider from 'plugins/pipelines/processor_registry';

routes
.when('/management/elasticsearch/pipeline/:id', {
  template: '<pipeline-edit></pipeline-edit>',
  resolve: {
    pipeline: function ($route, Private, Notifier) {
      const pipelines = Private(PipelinesProvider);
      const notify = new Notifier({ location: `Management - Pipelines` });
      const processorRegistry = Private(processorRegistryProvider);

      return pipelines.pipeline.load($route.current.params.id)
      .then((result) => {
        const pipeline = new Pipeline(processorRegistry, result);
        window.pipeline = pipeline;
        return pipeline;
      })
     .catch(notify.error);
    }
  }
})
.when('/management/elasticsearch/pipeline', {
  template: '<pipeline-edit></pipeline-edit>',
  resolve: {
    pipeline: function (Private) {
      const processorRegistry = Private(processorRegistryProvider);

      const pipeline = new Pipeline(processorRegistry);
      window.pipeline = pipeline;
      return pipeline;
    }
  }
});
