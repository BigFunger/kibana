import processorRegistry from 'plugins/pipelines/processor_registry';
import { AppendProcessor } from './append_processor';
import './processor_ui_append';

processorRegistry.register(() => {
  return {
    id: 'append',
    name: 'Append',
    ViewModel: AppendProcessor
  };
});
