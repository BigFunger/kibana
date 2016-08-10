import schemaProvider from './schema';
import converterProvider from './converter';

export default function (server) {
  const kibana = server.plugins.kibana;

  kibana.ingest.processors.register({
    set: {
      converterProvider: converterProvider,
      schemaProvider: schemaProvider
    }
  });
}
