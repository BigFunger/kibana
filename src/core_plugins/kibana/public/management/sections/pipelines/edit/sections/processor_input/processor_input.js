import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './processor_input.html';
import './processor_input.less';

const app = uiModules.get('kibana');

app.directive('processorInput', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      processorShell: '='
    },
    controllerAs: 'processorInput',
    bindToController: true,
    controller: function ($scope) {
      this.options = {
        document: {
          title: 'Document'
        },
        meta: {
          title: 'Metadata'
        }
      };
      this.currentOption = this.options.document;

      $scope.$watch('processorInput.processorShell.inputObject', () => {
        const processorShell = this.processorShell;

        this.docStates = {
          oldValue:  _.get(processorShell.inputObject, 'doc'),
          newValue: _.get(processorShell.inputObject, 'doc')
        };
        this.metaStates = {
          oldValue:  _.get(processorShell.inputObject, 'meta'),
          newValue: _.get(processorShell.inputObject, 'meta')
        };
      });
    }
  };
});
