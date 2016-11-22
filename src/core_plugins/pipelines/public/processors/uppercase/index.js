import processorRegistry from 'plugins/pipelines/processor_registry';
import { UppercaseProcessor } from './uppercase_processor';
import './processor_ui_uppercase';

processorRegistry.register(() => {
  return {
    id: 'uppercase',
    name: 'Uppercase',
    ViewModel: UppercaseProcessor
  };
});
