import processorRegistry from 'plugins/pipelines/processor_registry';
import { DotExpanderProcessor } from './dot_expander_processor';
import './processor_ui_dot_expander';

processorRegistry.register(() => {
  return {
    id: 'dot_expander',
    name: 'Dot Expander',
    ViewModel: DotExpanderProcessor
  };
});
