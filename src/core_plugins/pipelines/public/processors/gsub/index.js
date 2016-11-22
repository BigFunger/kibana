import processorRegistry from 'plugins/pipelines/processor_registry';
import { GsubProcessor } from './gsub_processor';
import './processor_ui_gsub';

processorRegistry.register(() => {
  return {
    id: 'gsub',
    name: 'Gsub',
    ViewModel: GsubProcessor
  };
});
