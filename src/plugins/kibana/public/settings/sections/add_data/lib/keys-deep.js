export default function keysDeep(object, base) {
  var result = [];
  base = base ? base + '.' : '';

  _.forIn(object, function(value, key) {
    var fullKey = base + key;
    if (_.isArray(value)) {
      result.push(fullKey)
      return;
    }
    if (_.isObject(value)) {
      result = result.concat(keysDeep(value, fullKey));
      return;
    }
    result.push(fullKey)
  });

  return result;
}
