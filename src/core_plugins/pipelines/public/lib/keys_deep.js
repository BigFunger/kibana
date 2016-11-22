import { forEach, isPlainObject } from 'lodash';

export function keysDeep(object, base) {
  let result = [];
  let delimitedBase = base ? base + '.' : '';

  forEach(object, (value, key) => {
    var fullKey = delimitedBase + key;
    if (isPlainObject(value)) {
      result = result.concat(keysDeep(value, fullKey));
    } else {
      result.push(fullKey);
    }
  });

  if (base) {
    result.push(base);
  }

  return result;
};
