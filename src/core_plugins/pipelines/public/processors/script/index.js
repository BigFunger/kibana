import processorRegistry from 'plugins/pipelines/processor_registry';
import ViewModel from './view_model';
import './directive';

processorRegistry.register(() => {
  return {
    id: 'script',
    name: 'Script',
    ViewModel: ViewModel
  };
});
