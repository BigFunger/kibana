import { assign } from 'lodash';
import Processor from 'ui/pipelines/processor/processor';

export default class Sort extends Processor {
  constructor(model) {
    super(
      'sort',
      'Sort',
      `Sorts the elements of an array ascending or descending. Homogeneous arrays
of numbers will be sorted numerically, while arrays of strings or heterogeneous
arrays of strings + numbers will be sorted lexicographically.`,
      'field',
      {
        field: '',
        sortOrder: 'asc'
      },
      model
    );
  }

  get description() {
    const chunks = [];
    const sortOrders = {
      asc: 'Ascending',
      desc: 'Descending'
    };

    if (this.field) chunks.push(` '${this.field}'`);
    chunks.push(` ${sortOrders[this.sortOrder]}`);
    return chunks.join('');
  }

  get model() {
    return assign(
      super.model,
      {
        field: this.field || '',
        sortOrder: this.sortOrder || ''
      }
    );
  }
};
