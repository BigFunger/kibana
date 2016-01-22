const _ = require('lodash');

export default function Processor(processorType) {
  const self = this;

  self.collapsed = false;
  //_.merge(self, _.pick(processorType, ['title', 'template', 'typeId', 'getDefinition', 'getDescription']));
  _.merge(self, processorType);
};

Processor.prototype.setParent = function(newParent) {
  const self = this;

  const oldParent = self.parent;
  self.parent = newParent;

  return (oldParent !== self.parent);
}

Processor.prototype.setError = function(error) {
  const self = this;
  self.errorMessage = error;
}

Processor.prototype.updateDescription = function() {
  const self = this;

  self.description = self.getDescription();
}
