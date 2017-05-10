import uiRoutes from 'ui/routes';
import template from './testbed.html';
import './testbed.less';

import 'ui/check_box';

uiRoutes.when('/testbed', {
  template: template,
  controllerAs: 'testbed',
  controller: class TestbedController {
    constructor() {
      this.disableChanges = false;

      this.myItems = [
        { id: 1, name: 'foo', isSelected: false },
        { id: 17, name: 'bar', isSelected: true },
        { id: 23, name: 'baz', isSelected: false }
      ];

      this.areAllSelected = false;
    }

    onSelectAllChange = (itemId, newIsSelected) => {
      this.myItems.forEach(item => item.isSelected = newIsSelected);
      this.updateAreAllSelected();
    }

    onSelectChange = (itemId, newIsSelected) => {
      const foundItem = this.myItems.find((item) => item.id === itemId);
      if (!foundItem) {
        return;
      }

      this.message = `Setting isSelected = ${newIsSelected} for ${foundItem.name}`;
      this.updateAreAllSelected();
    }

    updateAreAllSelected = () => {
      const newAllSelected = this.myItems.reduce((result, item) => result && item.isSelected, true);
      this.areAllSelected = newAllSelected;
    }
  }
});
