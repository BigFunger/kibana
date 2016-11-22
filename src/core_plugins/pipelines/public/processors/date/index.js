import processorRegistry from 'plugins/pipelines/processor_registry';
import { DateProcessor } from './date_processor';
import './processor_ui_date';

processorRegistry.register(() => {
  return {
    id: 'date',
    name: 'Date',
    ViewModel: DateProcessor
  };
});
