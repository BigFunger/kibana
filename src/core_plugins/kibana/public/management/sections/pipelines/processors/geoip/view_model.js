import _ from 'lodash';
import Processor from 'ui/ingest/processor/view_model';

export default class GeoIp extends Processor {
  constructor(processorRegistry, processorId, model) {
    super(
      processorRegistry,
      processorId,
      'geoip',
      'Geo IP',
      `Adds information about the geographical location of IP addresses,
based on data from the Maxmind database.`,
      'sourceField',
      {
        sourceField: '',
        targetField: '',
        databaseFile: '',
        databaseFields: []
      },
      model
    );
  }

  get description() {
    const source = this.sourceField || '?';
    const target = this.targetField || '?';
    return `[${source}] -> [${target}]`;
  }

  get model() {
    return _.assign(
      super.model,
      {
        sourceField: this.sourceField || '',
        targetField: this.targetField || '',
        databaseFile: this.databaseFile || '',
        databaseFields: this.databaseFields || []
      }
    );
  }
};

//GeoIp.id = 'geoip';
