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

export function set(processorApiDocument) {
  return {
    set: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.target_field,
      value: processorApiDocument.value
    }
  };
}
