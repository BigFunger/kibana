import processorRegistry from 'plugins/pipelines/processor_registry';
import { TrimProcessor } from './trim_processor';
import './processor_ui_trim';

processorRegistry.register(() => {
  return {
    id: 'trim',
    name: 'Trim',
    ViewModel: TrimProcessor
  };
});
