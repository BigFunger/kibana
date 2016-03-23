const _ = require('lodash');

function translateError(esError) {
  const rootCause = _.get(esError, 'root_cause[0]');

  return _.get(rootCause, 'reason') || _.get(rootCause, 'type');
}

export function processESIngestSimulateError(dirtyProcessorId, processors, error) {
  const results = processors.map((processor) => {
    return {
      processorId: processor.processorId,
      output: undefined,
      error: { isNested: true, compile: false, message: 'Pipeline Compilation Error' }
    };
  });

  const errorMessage = _.get(error, 'body.error.reason');
  const badResult = _.find(results, { 'processorId': dirtyProcessorId });
  badResult.error = { isNested: false, compile: true, message: errorMessage };

  return results;
}

export function processESIngestSimulateResponse(processors, resp) {
  const results = processors.map((processor) => {
    return {
      processorId: processor.processorId,
      output: processor.outputObject,
      error: undefined
    };
  });

  const processorResults = _.get(resp, 'docs[0].processor_results');
  processorResults.forEach((processorResult) => {
    const processorId = _.get(processorResult, 'tag');
    const output = _.get(processorResult, 'doc._source');
    const error = _.get(processorResult, 'error');
    const errorMessage = translateError(error);
    const badResult = _.find(results, { 'processorId': processorId });

    badResult.output = errorMessage ? undefined : output;
    badResult.error = errorMessage ? { isNested: false, compile: false, message: errorMessage } : undefined;
  });

  const errorIndex = _.findIndex(results, (result) => { return result.error !== undefined; });
  if (errorIndex !== -1) {
    for (let i = errorIndex + 1; i < results.length; i++) {
      const badResult = results[i];

      badResult.output = undefined;
      badResult.error = { isNested: true, compile: false, message: 'Invalid Parent Processor' };
    }
  }

  return results;
};
