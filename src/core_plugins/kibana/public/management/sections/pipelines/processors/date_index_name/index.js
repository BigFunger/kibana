import ingestProcessors from 'ui/registry/ingest_processors';
import ViewModel from './view_model';
import './directive';

ingestProcessors.register(() => {
  return {
    id: 'date_index_name',
    name: 'Date Index name',
    ViewModel: ViewModel
  };
});
