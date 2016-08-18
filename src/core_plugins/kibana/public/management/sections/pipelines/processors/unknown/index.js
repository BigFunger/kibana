import ingestProcessors from 'ui/registry/ingest_processors';
import ViewModel from './view_model';
import './directive';

//NOTE: This processor gets added to the registry, but will not appear in the
//processor dropdown because kibana checks with elasticsearch to determine which
//processors are installed on the cluster. 'Unknown' should not be a valid
//processor.
ingestProcessors.register(() => {
  return {
    id: 'unknown',
    name: 'Unknown',
    ViewModel: ViewModel
  };
});
