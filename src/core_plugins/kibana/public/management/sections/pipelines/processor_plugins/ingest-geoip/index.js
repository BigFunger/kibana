import processorServer from './server';

export default function (kibana) {

  return new kibana.Plugin({
    require: ['kibana'],
    uiExports: {
      ingestProcessors: [
        'plugins/ingest-geoip/index'
      ]
    },
    init: (server) => {
      processorServer(server);
    }
  });

};
