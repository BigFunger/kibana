import { registerDelete } from './register_delete';
import { registerGet } from './register_get';
import { registerPut } from './register_put';

export function registerPipeline(server) {
  registerDelete(server);
  registerGet(server);
  registerPut(server);
}
