import management from 'ui/management';
import routes from 'ui/routes';
import template from './index.html';
import './directives/filebeat_wizard';

routes.when('/management/data/filebeat', {
  template: template
});

management.getSection('data').register('filebeat', {
  display: 'Tail a File',
  order: 11,
  url: '#/management/data/filebeat/'
});
