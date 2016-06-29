import uiModules from 'ui/modules';
import '../styles/_pipeline_crud.less';
import template from '../views/pipeline_crud.html';
import IngestProvider from 'ui/ingest';
import Pipeline from '../lib/pipeline';

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

      $scope.pipelineId = 'foobar';

      $scope.new = function () {
        //const newPipeline = new Pipeline();
        // newPipeline.model = { pipelineId: $scope.pipelineId };
        // $scope.pipeline = newPipeline;
        // pipeline = $scope.pipeline;
        pipeline.model = {};
      };

      $scope.save = function () {
        pipeline.pipelineId = $scope.pipelineId;
        return ingest.pipeline.save(pipeline.model)
        .then((result) => {
          notify.info(`Pipeline '${pipeline.pipelineId}' saved!`);
        })
        .catch(notify.error);
      };

      $scope.load = function () {
        return ingest.pipeline.load($scope.pipelineId)
        .then((result) => {
          pipeline.model = result;
        })
        .catch(notify.error);
      };
    }
  };
});
