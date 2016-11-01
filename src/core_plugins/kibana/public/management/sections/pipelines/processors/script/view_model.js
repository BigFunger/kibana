import { assign } from 'lodash';
import Processor from 'ui/pipelines/processor/processor';

export default class Script extends Processor {
  constructor(model) {
    super(
      'script',
      'Script',
      `Allows inline, stored, and file scripts to be executed within ingest pipelines.`,
      undefined,
      {
        language: '',
        filename: '',
        scriptId: '',
        inlineScript: '',
        params: [],
        scriptType: 'inline'
      },
      model
    );
  }

  get description() {
    return 'apply script';
  }

  get model() {
    return assign(
      super.model,
      {
        language: this.language || '',
        filename: this.filename || '',
        scriptId: this.scriptId || '',
        inlineScript: this.inlineScript || '',
        params: this.params || [],
        scriptType: this.scriptType || ''
      }
    );
  }
};
