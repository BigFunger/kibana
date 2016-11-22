import schemaProvider from './schema';
import converterProvider from './converter';

export default function (server) {
  const pipelines = server.plugins.pipelines;

  pipelines.processors.register({
    uppercase: {
      converterProvider: converterProvider,
      schemaProvider: schemaProvider
    }
  });
}
