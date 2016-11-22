import processorRegistry from 'plugins/pipelines/processor_registry';
import { DateIndexNameProcessor } from './date_index_name_processor';
import './processor_ui_date_index_name';

processorRegistry.register(() => {
  return {
    id: 'date_index_name',
    name: 'Date Index name',
    ViewModel: DateIndexNameProcessor
  };
});
