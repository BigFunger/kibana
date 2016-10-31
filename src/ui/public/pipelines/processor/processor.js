import _ from 'lodash';

export default class Processor {
  constructor(typeId, title, helpText, mainField, defaultModel, model) {
    if (!typeId || !title) {
      throw new Error('Cannot instantiate the base Processor class.');
    }

    this.title = title;
    this.typeId = typeId;
    this.helpText = helpText;
    this.mainField = mainField;

    _.defaults(
      this,
      _.pick(model, _.keys(defaultModel)),
      defaultModel
    );
  }

  get model() {
    return {};
  }
}
