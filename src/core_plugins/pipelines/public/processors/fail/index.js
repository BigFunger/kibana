import processorRegistry from 'plugins/pipelines/processor_registry';
import { FailProcessor } from './fail_processor';
import './processor_ui_fail';

processorRegistry.register(() => {
  return {
    id: 'fail',
    name: 'Fail',
    ViewModel: FailProcessor
  };
});
