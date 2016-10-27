import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './processor_detail.html';
import './processor_detail.less';

const app = uiModules.get('kibana');

app.directive('processorDetail', function () {
  return {
    restrict: 'E',
    template: template,
    controller: function ($scope) {
    }
  };
});
