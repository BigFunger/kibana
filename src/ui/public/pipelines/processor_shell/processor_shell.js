import _ from 'lodash';
import keysDeep from 'ui/pipelines/lib/keys_deep';
import ProcessorCollection from 'ui/pipelines/processor_collection/processor_collection';
import processorStates from 'ui/pipelines/constants/processor_states';
import processorCollectionTypes from 'ui/pipelines/constants/processor_collection_types';

export default class ProcessorShell {

  constructor(processorRegistry, model) {
    ProcessorShell.counter += 1;
    const processorId = `processor_${ProcessorShell.counter}`;

    this.processorRegistry = processorRegistry;
    this.processor = undefined;
    this.collapsed = false;
    this.parent = undefined;
    this.inputObject = undefined;
    this.outputObject = undefined;
    this.processorTypes = processorRegistry.byId;
    this.inputControlsState = { enableShowChanges: false };
    this.outputControlsState = { };

    this.failureProcessorCollection = new ProcessorCollection(
      processorRegistry,
      'Processor Failure Branch',
      _.get(model, 'failureProcessors'),
      processorCollectionTypes.PROCESSOR_FAILURE,
      this
    );

    this.failureOptions = {
      ignore_error: 'Ignore, and index document',
      index_fail: 'Do not index document',
      on_error: 'Execute other processors'
    };

    const defaultModel = {
      processorId: processorId,
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
    const metaFields = [];

    this.inputObject = _.cloneDeep(input);
    this.suggestedFields = keysDeep(_.get(this.inputObject, 'doc'));
  }

  setTypeId(typeId, processorModel) {
    if (typeId === this.typeId) return; //todo: is this the best place for this check?

    this.typeId = typeId;
    const ProcessorType = this.processorTypes[typeId].ViewModel;

    processorModel = processorModel || _.get(this.processor, 'model');
    this.processor = new ProcessorType(processorModel);

    //TODO: Move this into the constructor chain? On second thought, I'm not sure I want to expose that...
    //ALSO, find out if this circular reference is a GC problem.
    this.processor.processorShell = this;
    this.state = processorStates.NOT_INITIALIZED;

    //update the processorId if it has not been manually changed by the user?
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

    // if (this.inputObject && this.outputObject) {
    //   if (!_.isEqual(this.inputObject.meta, this.outputObject.meta)) {
    //     this.inputControlsState.showMeta = true;
    //     this.outputControlsState.showMeta = true;
    //   }
    //   if (!_.isEqual(this.inputObject.doc, this.outputObject.doc)) {
    //     this.inputControlsState.showMeta = false;
    //     this.outputControlsState.showMeta = false;
    //   }
    // }
  }

  //I think these should be defined within each processor.
  cleanError(error) {
    if (!error) return;

    const conversions = [
      {
        pattern: /field \[(.*)\] of type \[(.*)\] cannot be cast to \[java\.util\.List\]/,
        matchLength: 3,
        substitution: (matches) => { return `field [${matches[1]}] does not contain an array value`; }
      },
      {
        pattern: /field \[(.*)\] of type \[(.*)\] cannot be cast to \[java\.lang\.String\]/,
        matchLength: 3,
        substitution: (matches) => { return `field [${matches[1]}] does not contain a string value`; }
      },
      {
        pattern: /field \[(.*)\] not present as part of path \[(.*)\]/,
        matchLength: 3,
        substitution: (matches) => { return `field [${matches[1]}] was not found`; }
      },
      {
        pattern: /field \[(.*)\] doesn't exist/,
        matchLength: 2,
        substitution: (matches) => { return `field [${matches[1]}] was not found`; }
      },
      {
        pattern: /compile error/,
        matchLength: 1,
        substitution: (matches) => { return `The specified script caused a compile error`; }
      },
      {
        pattern: /runtime error/,
        matchLength: 1,
        substitution: (matches) => { return `The specified script caused a runtime error`; }
      },
      {
        pattern: /Need \[file\], \[id\], or \[inline\] parameter to refer to scripts/,
        matchLength: 1,
        substitution: (matches) => {
          if (_.get(this, 'processor.scriptType') === 'inline') {
            return `Please define the inline script`;
          }
          if (_.get(this, 'processor.scriptType') === 'file') {
            return `Please provide the path to the external script`;
          }
          if (_.get(this, 'processor.scriptType') === 'script_id') {
            return `Please specify the id of the external script`;
          }
        }
      }
    ];

    _.forEach(conversions, (conversion) => {
      const matches = conversion.pattern.exec(error.message);
      if (matches && matches.length === conversion.matchLength) {
        error.message = conversion.substitution(matches);
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
