import processorRegistry from 'plugins/pipelines/processor_registry';
import { RemoveProcessor } from './remove_processor';
import './processor_ui_remove';

processorRegistry.register(() => {
  return {
    id: 'remove',
    name: 'Remove',
    ViewModel: RemoveProcessor
  };
});
