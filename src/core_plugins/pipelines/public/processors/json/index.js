import processorRegistry from 'plugins/pipelines/processor_registry';
import { JsonProcessor } from './json_processor';
import './processor_ui_json';

processorRegistry.register(() => {
  return {
    id: 'json',
    name: 'JSON',
    ViewModel: JsonProcessor
  };
});
