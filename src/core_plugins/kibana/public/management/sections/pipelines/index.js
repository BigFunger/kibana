import management from 'ui/management';
import './directives/pipeline_menu';
import './directives/pipeline_edit';
import './edit';
import './menu';

management.getSection('elasticsearch').register('pipelines', {
  display: 'Pipelines',
  order: 1,
  url: '#/management/elasticsearch/pipelines/'
});
