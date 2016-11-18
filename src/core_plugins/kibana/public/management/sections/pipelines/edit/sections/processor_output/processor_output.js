import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './processor_output.html';
import './processor_output.less';

const app = uiModules.get('kibana');

app.directive('processorOutput', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      processorShell: '='
    },
    controllerAs: 'processorOutput',
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
      this.onlyShowChanges = true;

      $scope.$watch('processorOutput.processorShell.outputObject', () => {
        const processorShell = this.processorShell;

        this.docStates = {
          oldValue: _.get(processorShell.inputObject, 'doc'),
          newValue: _.get(processorShell.outputObject, 'doc')
        };
        this.metaStates = {
          oldValue: _.get(processorShell.inputObject, 'meta'),
          newValue: _.get(processorShell.outputObject, 'meta')
        };
      });
    }
  };
});
