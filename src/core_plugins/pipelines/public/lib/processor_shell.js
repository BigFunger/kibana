import _ from 'lodash';
import { keysDeep } from './keys_deep';
import { ProcessorCollection } from './processor_collection';
import { processorStates } from './constants/processor_states';
import { processorCollectionTypes } from './constants/processor_collection_types';

export class ProcessorShell {

  constructor(pipeline, parentProcessorCollection, model) {
    this.pipeline = pipeline;
    this.processor = undefined;
    this.parent = undefined;
    this.inputObject = undefined;
    this.outputObject = undefined;
    this.processorTypes = this.pipeline.processorRegistry.byId;
    this.parentProcessorCollection = parentProcessorCollection;

    this.failureProcessorCollection = new ProcessorCollection(
      this.pipeline,
      'Processor Failure Branch',
      _.get(model, 'failureProcessors'),
      processorCollectionTypes.PROCESSOR_FAILURE,
      this
    );

    const defaultModel = {
      processorId: pipeline.getNewProcessorId(),
      typeId: undefined,
      state: processorStates.NOT_INITIALIZED,
      failureAction: 'index_fail'
    };

    _.defaults(
      this,
      _.pick(model, _.keys(defaultModel)),
      defaultModel
    );

    if (this.typeId) {
      const initialTypeId = this.typeId;
      this.typeId = undefined;
      this.setTypeId(initialTypeId, model);
    }
  }

  setParent(newParent) {
    const oldParent = this.parent;
    this.parent = newParent;

    return (oldParent !== this.parent);
  }

  setInput(input) {
    this.inputObject = _.cloneDeep(input);
    this.suggestedFields = keysDeep(_.get(this.inputObject, 'doc'));
  }

  setTypeId(typeId, processorModel) {
    if (typeId === this.typeId) return;

    this.typeId = typeId;
    this.processorId = this.pipeline.getNewProcessorId(this.typeId);
    const ProcessorType = this.processorTypes[typeId].ViewModel;

    processorModel = processorModel || _.get(this.processor, 'model');
    this.processor = new ProcessorType(processorModel);

    this.processor.processorShell = this;
    this.state = processorStates.NOT_INITIALIZED;
  }

  get allProcessors() {
    const result = _.assign({},
      _.set({}, this.processorId, this),
      this.failureProcessorCollection.allProcessors);

    return result;
  }

  get allProcessorCollections() {
    return this.failureProcessorCollection.allProcessorCollections;
  }

  get description() {
    if (this.processor) {
      return this.processor.description;
    } else {
      return '';
    }
  }

  get title() {
    if (this.processor) {
      return this.processor.title;
    } else {
      return 'New Processor';
    }
  }

  setSimulateResult(simulateResult) {
    this.simulateResult = simulateResult;
  }

  applySimulateResults(rootInput) {
    if (this.parent) {
      this.setInput(this.parent.outputObject);
    } else {
      this.setInput(rootInput);
    }

    this.failureProcessorCollection.applySimulateResults(this.inputObject);
    this.updateOutput();
    this.updateState();
  }

  get failureProcessorId() {
    return _.get(this.simulateResult, 'ingestMeta._ingest.on_failure_processor_tag');
  }

  updateOutput() {
    const output = _.get(this.simulateResult, 'output');
    const meta = _.get(this.simulateResult, 'ingestMeta');
    const error = _.get(this.simulateResult, 'error');

    let newOutputObject = undefined;
    if (output) {
      newOutputObject = {
        'doc': output,
        'meta': meta
      };
    } else {
      newOutputObject = this.failureProcessorCollection.output;
    }
    this.outputObject = newOutputObject;

    this.error = this.cleanError(error);
  }

  cleanError(error) {
    if (!error) return;

    let conversions = [
      {
        pattern: /No processor type exists with name \[undefined\]/,
        matchLength: 1,
        substitution: (matches) => {
          if (!this.field) {
            return {
              message: `Please select a Processor Type`,
              field: 'processorTypeId'
            };
          }
        },
      }
    ];
    if (this.processor) {
      conversions = conversions.concat(this.processor.errorConversions || []);
    }

    _.forEach(conversions, (conversion) => {
      const matches = conversion.pattern.exec(error.message);
      if (matches && matches.length === conversion.matchLength) {
        _.assign(error, conversion.substitution(matches));
      }
    });

    return error;
  }

  updateState() {
    const outputObject = this.outputObject;

    if (outputObject && !this.error) {
      this.state = processorStates.VALID;
    } else if (!outputObject && !this.error) {
      this.state = processorStates.NO_RESULT;
    } else if (!outputObject && this.error && this.error.compile) {
      this.state = processorStates.ERROR_COMPILE;
    } else if (!outputObject && this.error) {
      this.state = processorStates.ERROR_FAIL;
    } else if (outputObject && this.error) {
      this.state = processorStates.ERROR_RECOVER;
    }
  }

  get causeIndexFail() {
    return (this.state !== processorStates.VALID && this.state !== processorStates.ERROR_RECOVER);
  }

  get model() {
    const result = _.assign(
      {},
      _.get(this.processor, 'model'),
      {
        processorId: this.processorId,
        typeId: this.typeId,
        failureAction: this.failureAction,
        failureProcessors: this.failureProcessorCollection.model
      });

    return result;
  }

}

ProcessorShell.counter = 0;
