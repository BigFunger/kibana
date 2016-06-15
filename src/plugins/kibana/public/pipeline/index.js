import uiRoutes from 'ui/routes';
import uiModules from 'ui/modules';
import template from './index.html';
import './pipeline_app';

uiRoutes
.when('/pipeline', {
  template: template
});
