import processorRegistry from 'plugins/pipelines/processor_registry';
import { ScriptProcessor } from './script_processor';
import './processor_ui_script';

processorRegistry.register(() => {
  return {
    id: 'script',
    name: 'Script',
    ViewModel: ScriptProcessor
  };
});
