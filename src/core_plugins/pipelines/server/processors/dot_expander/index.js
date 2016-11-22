import schemaProvider from './schema';
import converterProvider from './converter';

export default function (server) {
  const pipelines = server.plugins.pipelines;

  pipelines.processors.register({
    dot_expander: {
      converterProvider: converterProvider,
      schemaProvider: schemaProvider
    }
  });
}
