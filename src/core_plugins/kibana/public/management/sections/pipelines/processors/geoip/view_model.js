import _ from 'lodash';
import Processor from '../base/view_model';

export class GeoIp extends Processor {
  constructor(processorId, model) {
    super(
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

GeoIp.id = 'geoip';
