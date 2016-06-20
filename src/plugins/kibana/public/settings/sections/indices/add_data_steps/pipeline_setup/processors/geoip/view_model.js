import _ from 'lodash';
import Processor from '../base/view_model';

export class GeoIp extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'geoip',
      'Geo IP',
      `Adds information about the geographical location of IP addresses,
based on data from the Maxmind database.`
    );

    _.defaults(
      this,
      _.pick(model, [
        'sourceField',
        'targetField',
        'databaseFile',
        'databaseFields',
        'ignoreFailure'
      ]),
      {
        sourceField: '',
        targetField: '',
        databaseFile: '',
        databaseFields: [],
        ignoreFailure: 'index_fail'
      }
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
