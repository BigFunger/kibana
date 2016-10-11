import _ from 'lodash';
import { cloneDeep, map, forEach, last, indexOf } from 'lodash';

export class Sample {
  constructor(model) {
    const defaultModel = {
      doc: {},
      state: Sample.states.UNKNOWN,
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
      doc: cloneDeep(this.doc),
      description: this.description
    };

    return result;
  }
}

Sample.states = {
  VALID: 'valid with current pipeline',
  INVALID: 'invalid with the current pipeline',
  UNKNOWN: 'has not yet been run against the current pipeline'
};

export class SampleCollection {
  constructor(model) {
    this.index = -1;

    this.samples = [];
    forEach(model, (sampleModel) => {
      this.add(new Sample(sampleModel));
    });
  }

  getCurrentSample() {
    if (this.index === -1) {
      return undefined;
    }

    return this.samples[this.index];
  }

  add(sample) {
    this.samples.push(sample);
    if (this.index = -1) {
      this.index = 0;
    }
  }

  replace(sample, newSample) {
    const index = indexOf(this.samples, sample);
    this.samples.splice(index, 1, newSample);
  }

  remove(sample) {
    const index = indexOf(this.samples, sample);
    _.pullAt(this.samples, index);

    if (this.samples.length === 0) {
      this.index = -1;
    } else if (this.index === index) {
      this.index = 0;
    }
  }

  addFromLogs(logLines, propertyName) {
    const splitRawSamples = ('' + logLines).split('\n');
    _.forEach(splitRawSamples, (sample) => {
      this.add(defaultObject(sample));
    });

    function defaultObject(sample) {
      const result = {};
      _.set(result, propertyName, sample);
      return result;
    }
  }

  applySimulateResults(simulateResults) {
    forEach(this.samples, (sample) => {
      sample.state = Sample.states.UNKNOWN;
    });

    forEach(simulateResults, (simulateResult, index) => {
      const sample = this.samples[index];
      const lastProcessorResult = last(simulateResult);
      if (lastProcessorResult && !lastProcessorResult.output) {
        sample.state = Sample.states.INVALID;
      } else {
        sample.state = Sample.states.VALID;
      }
    });
  }

  get model() {
    const result = map(this.samples, (sample) => {
      return sample.model;
    });

    return result;
  }
}
