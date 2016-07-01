import _ from 'lodash';
import Processor from '../base/view_model';

export class Script extends Processor {
  constructor(processorId, model) {
    super(
      processorId,
      'script',
      'Script',
      `Allows inline, stored, and file scripts to be executed within ingest pipelines.`,
      {
        targetField: '',
        language: '',
        filename: '',
        scriptId: '',
        inlineScript: ''
      },
      model
    );
  }

  get description() {
    const target = this.targetField || '?';
    return `[${target}]`;
  }

  get model() {
    return _.assign(
      super.model,
      {
        targetField: this.targetField || '',
        language: this.language || '',
        filename: this.filename || '',
        scriptId: this.scriptId || '',
        inlineScript: this.inlineScript || ''
      }
    );
  }
};

Script.id = 'script';
