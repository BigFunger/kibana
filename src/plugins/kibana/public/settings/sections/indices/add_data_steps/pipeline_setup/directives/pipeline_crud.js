import uiModules from 'ui/modules';
import '../styles/_pipeline_crud.less';
import template from '../views/pipeline_crud.html';
import IngestProvider from 'ui/ingest';

const app = uiModules.get('kibana');

app.directive('pipelineCrud', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      pipeline: '='
    },
    controller: function ($scope, Private, Notifier) {
      const pipeline = $scope.pipeline;
      const ingest = Private(IngestProvider);
      const notify = new Notifier({ location: `Ingest Pipeline Setup` });

      $scope.save = function () {
        return ingest.pipeline.save(pipeline.model)
        .then((result) => {
          notify.info(`Pipeline '${pipeline.pipelineId}' saved!`);
        })
        .catch(notify.error);
      };

      $scope.load = function () {
        const pipelineId = 'foobar';

        return ingest.pipeline.load(pipelineId)
        .then((result) => {
          notify.info(`Pipeline '${result.pipelineId}' loaded!`);
          //TODO: Load this model into the pipeline view_model.
        })
        .catch(notify.error);
      };
    }
  };
});
