import { registerSimulate } from './simulate';
import { registerPipeline } from './pipeline';
import { registerPipelines } from './pipelines';

export function registerRoutes(server) {
  registerSimulate(server);
  registerPipeline(server);
  registerPipelines(server);
}
