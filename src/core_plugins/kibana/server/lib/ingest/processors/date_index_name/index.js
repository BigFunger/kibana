import schemaProvider from './schema';
import converterProvider from './converter';

export default function (server) {
  const kibana = server.plugins.kibana;

  kibana.ingest.processors.register({
    date_index_name: {
      converterProvider: converterProvider,
      schemaProvider: schemaProvider
    }
  });
}
