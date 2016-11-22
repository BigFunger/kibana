import { assign, get } from 'lodash';
import { Processor } from 'plugins/pipelines/lib/processor';

export class ScriptProcessor extends Processor {
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

    this.scriptTypes = {
      inline: 'Inline Script',
      file: 'Script File',
      script_id: 'Script Id'
    };
  }

  get errorConversions() {
    return [
      {
        pattern: /\[lang\] required property is missing/,
        matchLength: 1,
        substitution: (matches) => {
          return {
            message: `Language is required`,
            field: 'language'
          };
        },
      },
      {
        pattern: /compile error/,
        matchLength: 1,
        substitution: (matches) => {
          const result = { message: `The specified script caused a compile error` };
          if (this.scriptType === 'inline') result.field = 'inlineScript';
          if (this.scriptType === 'file') result.field = 'filename';
          if (this.scriptType === 'script_id') result.field = 'scriptId';

          return result;
        }
      },
      {
        pattern: /runtime error/,
        matchLength: 1,
        substitution: (matches) => {
          const result = { message: `The specified script caused a runtime error` };
          if (this.scriptType === 'inline') result.field = 'inlineScript';
          if (this.scriptType === 'file') result.field = 'filename';
          if (this.scriptType === 'script_id') result.field = 'scriptId';

          return result;
        }
      },
      {
        pattern: /Need \[file\], \[id\], or \[inline\] parameter to refer to scripts/,
        matchLength: 1,
        substitution: (matches) => {
          if (this.scriptType === 'inline') {
            return {
              message: `Inline Script is required`,
              field: 'inlineScript'
            };
          }
          if (this.scriptType === 'file') {
            return {
              message: `Please provide the path to the external script`,
              field: 'filename'
            };
          }
          if (this.scriptType === 'script_id') {
            return {
              message: `Please specify the id of the external script`,
              field: 'scriptId'
            };
          }
        }
      }
    ];
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
