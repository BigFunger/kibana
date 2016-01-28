const app = require('ui/modules').get('kibana');
const _ = require('lodash');
const $ = require('jquery');
require('../styles/_process_container_header.less');

app.directive('processContainerHeader', function () {
  return {
    restrict: 'E',
    scope: {
      processor: '=',
      field: '=',
      pipeline: '='
    },
    template: require('../views/process_container_header.html')
  };
});
