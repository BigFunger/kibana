import management from 'ui/management';
import routes from 'ui/routes';
import PipelinesProvider from 'ui/pipelines';
import Pipeline from 'ui/pipelines/pipeline/pipeline';
import processorRegistryProvider from 'ui/registry/pipelines_processors';

import '../processors';

import 'ui/directives/bread_crumbs';
import './sections/pipeline_edit';
import './sections/primary_nav';
import './sections/secondary_nav';
import './sections/tertiary_nav';

import './sections/pipeline_documents_nav';
import './sections/pipeline_documents_detail';
import './sections/pipeline_documents';

import './sections/pipeline_processors_nav';
import './sections/pipeline_processors_detail';
import './sections/pipeline_processors';

import './sections/pipeline_pipeline';
import './sections/pipeline_pipeline_detail';

import './sections/processor_tree';
import './sections/processor_tree_item';
import './sections/processor_tree_header';
import './sections/processor_detail';
import './sections/document_selector';
import './sections/processor_type_select';
import './sections/field_select';
import './sections/ui_select_tweaks';
import './sections/section_collapser';
import './sections/processor_input';
import './sections/processor_output';
import './sections/processor_error';
import './sections/processor_failure_action';

import './sections/pipeline_input';
import './sections/pipeline_detail';

import './sections/document_viewer';

import 'ui/draggable/draggable_container';
import 'ui/draggable/draggable_handle';
import 'ui/draggable/draggable_item';

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
