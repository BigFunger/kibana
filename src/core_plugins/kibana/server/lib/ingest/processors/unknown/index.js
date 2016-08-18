import schemaProvider from './schema';
import converterProvider from './converter';

export default function (server) {
  const kibana = server.plugins.kibana;

  kibana.ingest.processors.register({
    unknown: {
      converterProvider: converterProvider,
      schemaProvider: schemaProvider
    }
  });
}
