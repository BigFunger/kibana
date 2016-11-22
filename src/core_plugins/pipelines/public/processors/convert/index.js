import processorRegistry from 'plugins/pipelines/processor_registry';
import { ConvertProcessor } from './convert_processor';
import './processor_ui_convert';

processorRegistry.register(() => {
  return {
    id: 'convert',
    name: 'Convert',
    ViewModel: ConvertProcessor
  };
});
