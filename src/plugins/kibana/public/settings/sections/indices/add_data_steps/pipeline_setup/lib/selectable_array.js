import _ from 'lodash';

export default function selectableArray(array, selectedValues) {
  return array.map((item) => {
    const selected = _.find(selectedValues, (o) => {
      return o.toUpperCase() === item.toUpperCase();
    });

    return {
      title: item,
      selected: !_.isUndefined(selected)
    };
  });
};
