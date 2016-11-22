import processorRegistry from 'plugins/pipelines/processor_registry';
import { LowercaseProcessor } from './lowercase_processor';
import './processor_ui_lowercase';

processorRegistry.register(() => {
  return {
    id: 'lowercase',
    name: 'Lowercase',
    ViewModel: LowercaseProcessor
  };
});
