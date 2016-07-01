import _ from 'lodash';
import Processor from '../base/view_model';

export class Sort extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'sort',
      'Sort',
      `Sorts the elements of an array ascending or descending. Homogeneous arrays
of numbers will be sorted numerically, while arrays of strings or heterogeneous
arrays of strings + numbers will be sorted lexicographically.`,
      {
        targetField: '',
        sortOrder: 'asc'
      },
      model
    );
  }

  get description() {
    const sortOrders = {
      asc: 'Ascending',
      desc: 'Descending'
    };
    const target = this.targetField || '?';
    return `[${target}] ${sortOrders[this.sortOrder]}`;
  }

  get model() {
    return _.assign(
      super.model,
      {
        targetField: this.targetField || '',
        sortOrder: this.sortOrder || ''
      }
    );
  }
};

Sort.id = 'sort';
