import processorRegistry from 'plugins/pipelines/processor_registry';
import { JoinProcessor } from './join_processor';
import './processor_ui_join';

processorRegistry.register(() => {
  return {
    id: 'join',
    name: 'Join',
    ViewModel: JoinProcessor
  };
});
