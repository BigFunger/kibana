import processorRegistry from 'plugins/pipelines/processor_registry';
import { ForeachProcessor } from './foreach_processor';
import './processor_ui_foreach';

processorRegistry.register(() => {
  return {
    id: 'foreach',
    name: 'For Each',
    ViewModel: ForeachProcessor
  };
});
