export function append(processorApiDocument) {
  return {
    append: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.target_field,
      value: processorApiDocument.values
    }
  };
}

export function convert(processorApiDocument) {
  return {
    convert: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.source_field,
      type: processorApiDocument.type
    }
  };
}

export function date(processorApiDocument) {
  return {
    date: {
      tag: processorApiDocument.processor_id,
      match_field: processorApiDocument.source_field,
      target_field: processorApiDocument.target_field,
      match_formats: processorApiDocument.formats,
      timezone: processorApiDocument.timezone,
      locale: processorApiDocument.locale
    }
  };
}

export function geoip(processorApiDocument) {
  return {
    geoip: {
      tag: processorApiDocument.processor_id,
      source_field: processorApiDocument.source_field,
      target_field: processorApiDocument.target_field
    }
  };
}

export function grok(processorApiDocument) {
  return {
    grok: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.source_field,
      pattern: processorApiDocument.pattern
    }
  };
}

export function gsub(processorApiDocument) {
  return {
    gsub: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.source_field,
      pattern: processorApiDocument.pattern,
      replacement: processorApiDocument.replacement
    }
  };
}

export function join(processorApiDocument) {
  return {
    join: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.source_field,
      separator: processorApiDocument.separator
    }
  };
}

export function lowercase(processorApiDocument) {
  return {
    lowercase: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.source_field
    }
  };
}

export function remove(processorApiDocument) {
  return {
    remove: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.source_field
    }
  };
}

export function rename(processorApiDocument) {
  return {
    rename: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.source_field,
      to: processorApiDocument.target_field
    }
  };
}

export function set(processorApiDocument) {
  return {
    set: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.target_field,
      value: processorApiDocument.value
    }
  };
}
