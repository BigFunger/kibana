export function set(processorApiDocument) {
  return {
    set: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.target_field,
      value: processorApiDocument.value
    }
  };
}

export function append(processorApiDocument) {
  return {
    append: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.target_field,
      values: processorApiDocument.values
    }
  };
}
