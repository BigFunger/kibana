import _ from 'lodash';
import 'ui/paginated_table';
import modules from 'ui/modules';
import template from '../views/pipeline_menu.html';
import '../styles/_pipeline_menu.less';
import pipelineControlsTemplate from '../partials/_pipeline_controls.html';

const app = modules.get('apps/management');

app.directive('pipelineMenu', function () {
  return {
    restrict: 'E',
    template: template,
    controller: function ($scope, $route, kbnUrl) {
      $scope.pipelines = $route.current.locals.pipelines;

      $scope.addNew = function () {
        kbnUrl.change(`/management/elasticsearch/pipeline`, {});
      };

      const deletePipeline = (pipeline) => {
        //console.log('you are deleting a pipeline!', pipeline);
      };

      const editPipeline = (pipeline) => {
        kbnUrl.change(`/management/elasticsearch/pipeline/${pipeline.pipelineId}`, {});
      };

      const buildRows = () => {
        $scope.rows = _.map($scope.pipelines, (pipeline) => {
          return [
            _.escape(pipeline.pipelineId),
            _.escape(pipeline.description),
            {
              markup: pipelineControlsTemplate,
              scope: _.assign($scope.$new(), {
                pipeline: pipeline,
                buildRows: buildRows,
                deletePipeline: deletePipeline,
                editPipeline: editPipeline
              }),
              value: pipeline
            }
          ];
        });
      };

      $scope.columns = [
        {title: 'Pipeline Id'},
        {title: 'Description'},
        {title: '', sortable: false}
      ];

      buildRows();
    }
  };
});
