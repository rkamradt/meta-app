module.exports = function(json) {
  return {
    '_visible': json.visible,
    '_key': json.key,
    '_name': json.name,
    '_deflt': json.deflt,
    'isVisible': function() {
      return this._visible;
    },
    'isKey': function() {
      return this._key;
    },
    'getName': function() {
      return this._name;
    },
    'getDefaultValue': function() {
      return this._deflt;
    }
  };
};
