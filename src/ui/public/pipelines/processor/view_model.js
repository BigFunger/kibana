import _ from 'lodash';
import keysDeep from 'ui/pipelines/lib/keys_deep';
// import ProcessorCollection from 'ui/pipelines/processor_collection/view_model';
//import processorStates from 'ui/pipelines/constants/processor_states';
//import processorCollectionTypes from 'ui/pipelines/constants/processor_collection_types';

export default class Processor {
  constructor(processorId, typeId, title, helpText, mainField, defaultModel, model) {
    if (!typeId || !title) {
      throw new Error('Cannot instantiate the base Processor class.');
    }

    this.processorId = processorId;
    this.title = title;
    this.typeId = typeId;
    this.helpText = helpText;
    // this.collapsed = false;
    // this.parent = undefined;
    // this.inputObject = undefined;
    // this.outputObject = undefined;
    // this.error = undefined;
    // this.state = processorStates.NOT_INITIALIZED;
    this.mainField = mainField;
    // this.inputControlsState = { enableShowChanges: false };
    // this.outputControlsState = { };

    //defaultModel.failureAction = 'index_fail';

    _.defaults(
      this,
      _.pick(model, _.keys(defaultModel)),
      defaultModel
    );
  }

  // setParent(newParent) {
  //   const oldParent = this.parent;
  //   this.parent = newParent;

  //   return (oldParent !== this.parent);
  // }

  // updateOutput() {
  //   const output = _.get(this.simulateResult, 'output');
  //   const meta = _.get(this.simulateResult, 'ingestMeta');
  //   const error = _.get(this.simulateResult, 'error');

  //   let newOutputObject = undefined;
  //   if (output) {
  //     newOutputObject = {
  //       'doc': output,
  //       'meta': meta
  //     };
  //   }
  //   this.outputObject = newOutputObject;

  //   //TODO: Don't know if this is what we want to do....
  //   // if (this.inputObject && this.outputObject) {
  //   //   if (!_.isEqual(this.inputObject.meta, this.outputObject.meta)) {
  //   //     this.inputControlsState.showMeta = true;
  //   //     this.outputControlsState.showMeta = true;
  //   //   }
  //   //   if (!_.isEqual(this.inputObject.doc, this.outputObject.doc)) {
  //   //     this.inputControlsState.showMeta = false;
  //   //     this.outputControlsState.showMeta = false;
  //   //   }
  //   // }

  //   this.error = error;
  // }

  // setInput(input) {
  //   //TODO: Do I want to pull this from outputObject.meta?
  //   // const metaFields = [
  //   //   '_index',
  //   //   '_type',
  //   //   '_id',
  //   //   '_routing',
  //   //   '_parent',
  //   //   '_timestamp',
  //   //   '_ttl'
  //   // ];
  //   const metaFields = [];

  //   this.inputObject = _.cloneDeep(input);
  //   this.suggestedFields = _.union(keysDeep(_.get(this.inputObject, 'doc')), metaFields);
  // }

  // updateState() {
  //   const output = this.output;

  //   if (output && !this.error) {
  //     this.state = processorStates.VALID;
  //   } else if (!output && !this.error) {
  //     this.state = processorStates.NO_RESULT;
  //   } else if (!output && this.error && this.error.compile) {
  //     this.state = processorStates.ERROR_COMPILE;
  //   } else if (!output && this.error) {
  //     this.state = processorStates.ERROR_FAIL;
  //   } else if (output && this.error) {
  //     this.state = processorStates.ERROR_RECOVER;
  //   }
  // }

  // get causeIndexFail() {
  //   return (this.state !== processorStates.VALID && this.state !== processorStates.ERROR_RECOVER);
  // }

  get model() {
    return {
      // processorId: this.processorId,
      // typeId: this.typeId,
      // failureAction: this.failureAction,
      // failureProcessors: this.failureProcessorCollection.model
    };
  }

  // get output() {
  //   return this.outputObject ? this.outputObject : this.failureProcessorCollection.output;
  // }

  // get allProcessors() {
  //   return _.assign({},
  //     this.failureProcessorCollection.allProcessors);
  // }

  // get allProcessorCollections() {
  //   return this.failureProcessorCollection.allProcessorCollections;
  // }

  // setSimulateResult(simulateResult) {
  //   this.simulateResult = simulateResult;
  // }

  // applySimulateResults(rootInput) {
  //   this.updateOutput();

  //   if (this.parent) {
  //     this.setInput(this.parent.output);
  //   } else {
  //     this.setInput(rootInput);
  //   }

  //   this.failureProcessorCollection.applySimulateResults(this.inputObject);

  //   this.updateState();
  // }

  // get failureProcessorId() {
  //   return _.get(this.simulateResult, 'ingestMeta._ingest.on_failure_processor_tag');
  // }
}
