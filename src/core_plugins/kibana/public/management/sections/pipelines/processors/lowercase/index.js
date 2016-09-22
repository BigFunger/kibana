import processorRegistry from 'ui/registry/pipelines_processors';
import ViewModel from './view_model';
import './directive';

processorRegistry.register(() => {
  return {
    id: 'lowercase',
    name: 'Lowercase',
    ViewModel: ViewModel
  };
});
