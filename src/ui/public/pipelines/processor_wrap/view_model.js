import _ from 'lodash';
import { keys, pick, defaults } from 'lodash';

export class processorWrap {
  constructor(model) {
    const defaultModel = {
      typeId: undefined
    };

    defaults(
      this,
      pick(model, keys(defaultModel)),
      defaultModel
    );
  }
}
