import processorRegistry from 'plugins/pipelines/processor_registry';
import { SetProcessor } from './set_processor';
import './processor_ui_set';

processorRegistry.register(() => {
  return {
    id: 'set',
    name: 'Set',
    ViewModel: SetProcessor
  };
});
