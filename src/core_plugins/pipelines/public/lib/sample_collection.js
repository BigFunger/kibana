import _ from 'lodash';
import { cloneDeep, map, forEach, last, indexOf, get } from 'lodash';
import { sampleStates } from './constants/sample_states';
import { Sample } from './sample';

export class SampleCollection {
  constructor(model) {
    this.samples = [];
    forEach(get(model, 'samples'), (sampleModel) => {
      this.add(new Sample(sampleModel));
    });

    const defaultModel = {
      index: 0
    };

    _.defaults(
      this,
      _.pick(model, _.keys(defaultModel)),
      defaultModel
    );
  }

  getCurrentSample() {
    if (this.index === -1) {
      return undefined;
    }

    return this.samples[this.index];
  }

  getSuggestedDescription() {
    let counter = this.samples.length;
    let description;

    const predicate = (sample) => {
      return sample.description === description;
    };

    do {
      counter += 1;
      description = `Sample Document ${counter}`;
    } while (_.find(this.samples, predicate));

    return description;
  }

  add(sample) {
    this.samples.push(sample);
    if (this.index === -1) {
      this.setCurrent(sample);
    }
  }

  replace(sample, newSample) {
    const index = indexOf(this.samples, sample);
    if (index === -1) {
      this.add(newSample);
    } else {
      this.samples.splice(index, 1, newSample);
    }
  }

  setCurrent(sample) {
    const index = indexOf(this.samples, sample);
    this.index = index;
  }

  remove(sample) {
    const index = indexOf(this.samples, sample);
    _.pullAt(this.samples, index);

    if (index === this.index) {
      if (this.samples.length === 0) {
        this.index = -1;
      } else if (this.index === index) {
        this.index = 0;
      }
    } else if (index < this.index) {
      this.index -= 1;
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
      sample.state = sampleStates.UNKNOWN;
    });

    forEach(simulateResults, (simulateResult, index) => {
      const sample = this.samples[index];
      const lastProcessorResult = last(simulateResult);
      if (lastProcessorResult && !lastProcessorResult.output) {
        sample.state = sampleStates.INVALID;
      } else {
        sample.state = sampleStates.VALID;
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
