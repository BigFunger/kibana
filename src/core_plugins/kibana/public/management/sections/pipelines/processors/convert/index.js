import ingestProcessors from 'ui/registry/ingest_processors';
import ViewModel from './view_model';
import './directive';

ingestProcessors.register(() => {
  return {
    id: 'convert',
    name: 'Convert',
    ViewModel: ViewModel
  };
});
