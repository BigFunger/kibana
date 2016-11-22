import _ from 'lodash';
import { sampleStates } from './constants/sample_states';

export class Sample {
  constructor(model) {
    const defaultModel = {
      doc: {},
      meta: {},
      state: sampleStates.VALID,
      description: ''
    };

    _.defaults(
      this,
      _.pick(model, _.keys(defaultModel)),
      defaultModel
    );
  }

  get model() {
    const result = {
      doc: _.cloneDeep(this.doc),
      description: this.description
    };

    return result;
  }
}
