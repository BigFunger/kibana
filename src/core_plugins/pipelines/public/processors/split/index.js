import processorRegistry from 'plugins/pipelines/processor_registry';
import { SplitProcessor } from './split_processor';
import './processor_ui_split';

processorRegistry.register(() => {
  return {
    id: 'split',
    name: 'Split',
    ViewModel: SplitProcessor
  };
});
