import _ from 'lodash';
import { base as baseSchema } from '../../../lib/ingest/processors/base/schema'; //TODO: This can be changed to a default export statement, once all processors have been converted
import baseConverter from '../../../lib/ingest/processors/base/converter';
import registerCoreProcessors from './register_core_processors';

export default function ingestManager(server) {
  const kibana = server.plugins.kibana;

  const schemas = {};
  const converters = {};

  function registerProcessor(options) {
    //options will come in this format:
    //{
    //  typeid: {
    //    schemaProvider: func,
    //    converterProvider: func
    //  }
    //}
    const typeId = _.keys(options)[0];
    const processorOptions = options[typeId];

    //TODO: validation of options object

    _.set(schemas, typeId, processorOptions.schemaProvider(baseSchema));
    _.set(converters, typeId, processorOptions.converterProvider(baseConverter));
  };

  kibana.ingest = {
    processors: {
      register: registerProcessor,
      schemas: schemas,
      converters: converters
    }
  };

  registerCoreProcessors(server);
}
