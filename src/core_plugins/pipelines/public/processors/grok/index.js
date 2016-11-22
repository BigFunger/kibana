import processorRegistry from 'plugins/pipelines/processor_registry';
import { GrokProcessor } from './grok_processor';
import './processor_ui_grok';

processorRegistry.register(() => {
  return {
    id: 'grok',
    name: 'Grok',
    ViewModel: GrokProcessor
  };
});
