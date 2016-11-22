import processorRegistry from 'plugins/pipelines/processor_registry';
import { SortProcessor } from './sort_processor';
import './processor_ui_sort';

processorRegistry.register(() => {
  return {
    id: 'sort',
    name: 'Sort',
    ViewModel: SortProcessor
  };
});
