import processorRegistry from 'plugins/pipelines/processor_registry';
import { RenameProcessor } from './rename_processor';
import './processor_ui_rename';

processorRegistry.register(() => {
  return {
    id: 'rename',
    name: 'Rename',
    ViewModel: RenameProcessor
  };
});
