define(function (require) {
  require('./directives/kbn-settings-add-data');

  require('ui/routes')
  .when('/settings/add_data', {
    template: require('plugins/kibana/settings/sections/add_data/index.html')
  });

  return {
    order: 1,
    name: 'add_data',
    display: 'Add Data',
    url: '#/settings/add_data'
  };
});
