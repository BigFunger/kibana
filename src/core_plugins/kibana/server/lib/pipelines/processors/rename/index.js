import schemaProvider from './schema';
import converterProvider from './converter';

export default function (server) {
  const kibana = server.plugins.kibana;

  kibana.pipelines.processors.register({
    rename: {
      converterProvider: converterProvider,
      schemaProvider: schemaProvider
    }
  });
}
