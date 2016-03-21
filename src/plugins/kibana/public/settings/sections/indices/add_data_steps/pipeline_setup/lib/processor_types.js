import _ from 'lodash';
import keysDeep from '../../../../../../../common/lib/keys_deep';

class Processor {
  constructor(processorId, typeId, title) {
    if (!typeId || !title) {
      throw new Error('Cannot instantiate the base Processor class.');
    }

    this.processorId = processorId;
    this.title = title;
    this.typeId = typeId;
    this.collapsed = false;
    this.parent = undefined;
    this.inputObject = undefined;
    this.outputObject = undefined;
    this.error = undefined;
  }

  setParent(newParent) {
    const oldParent = this.parent;
    this.parent = newParent;

    return (oldParent !== this.parent);
  }
}

export class Append extends Processor {
  constructor(processorId) {
    super(processorId, 'append', 'Append');
    this.targetField = '';
    this.values = [];
  }

  get description() {
    const target = this.targetField || '?';
    return `[${target}]`;
  }

  get model() {
    return {
      processorId: this.processorId,
      typeId: this.typeId,
      targetField: this.targetField,
      values: this.values
    };
  }
}

export class Convert extends Processor {
  constructor(processorId) {
    super(processorId, 'convert', 'Convert');
    this.sourceField = '';
    this.type = 'string';
  }

  get description() {
    const source = this.sourceField || '?';
    const type = this.type || '?';
    return `[${source}] to ${type}`;
  }

  get model() {
    return {
      processorId: this.processorId,
      typeId: this.typeId,
      sourceField: this.sourceField,
      type: this.type
    };
  }
}

export class Date extends Processor {
  constructor(processorId) {
    super(processorId, 'date', 'Date');
    this.sourceField = '';
    this.targetField = '@timestamp';
    this.formats = [];
    this.timezone = 'Etc/UTC';
    this.locale = 'ENGLISH';
    this.customFormat = '';
  }

  get description() {
    const source = this.sourceField || '?';
    const target = this.targetField || '?';
    return `[${source}] -> [${target}]`;
  }

  get model() {
    const formats = [];
    this.formats.forEach((format) => {
      if (format === 'Custom') {
        if (this.customFormat) {
          formats.push(this.customFormat);
        }
      } else {
        formats.push(format);
      }
    });

    return {
      processorId: this.processorId,
      typeId: this.typeId,
      sourceField: this.sourceField,
      targetField: this.targetField,
      formats: formats,
      timezone: this.timezone,
      locale: this.locale
    };
  }
}

export class GeoIp extends Processor {
  constructor(processorId) {
    super(processorId, 'geoip', 'Geo IP');
    this.sourceField = '';
    this.targetField = 'geoip';
  }

  get description() {
    const source = this.sourceField || '?';
    const target = this.targetField || '?';
    return `[${source}] -> [${target}]`;
  }

  get model() {
    return {
      processorId: this.processorId,
      typeId: this.typeId,
      targetField: this.targetField,
      sourceField: this.sourceField
    };
  }
};

export class Grok extends Processor {
  constructor(processorId) {
    super(processorId, 'grok', 'Grok');
    this.sourceField = '';
    this.pattern = '';
  }

  get description() {
    let inputKeys = keysDeep(this.inputObject);
    let outputKeys = keysDeep(this.outputObject);
    let added = _.difference(outputKeys, inputKeys);

    let addedDescription = added.sort().map(field => `[${field}]`).join(', ');

    const source = this.sourceField || '?';
    return `[${source}] -> ${addedDescription}`;
  }

  get model() {
    return {
      processorId: this.processorId,
      typeId: this.typeId,
      sourceField: this.sourceField,
      pattern: this.pattern
    };
  }
};

export class Gsub extends Processor {
  constructor(processorId) {
    super(processorId, 'gsub', 'Gsub');
    this.sourceField = '';
    this.pattern = '';
    this.replacement = '';
  }

  get description() {
    const source = this.sourceField || '?';
    return `[${source}] - '${this.pattern}' -> '${this.replacement}'`;
  }

  get model() {
    return {
      processorId: this.processorId,
      typeId: this.typeId,
      sourceField: this.sourceField,
      pattern: this.pattern,
      replacement: this.replacement
    };
  }
};

export class Set extends Processor {
  constructor(processorId) {
    super(processorId, 'set', 'Set');
    this.targetField = '';
    this.value = '';
  }

  get description() {
    const target = this.targetField || '?';
    return `[${target}]`;
  }

  get model() {
    return {
      processorId: this.processorId,
      typeId: this.typeId,
      targetField: this.targetField,
      value: this.value
    };
  }
};
