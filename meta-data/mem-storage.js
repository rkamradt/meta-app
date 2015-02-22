module.exports = function(m) {
  var metadata = m;
  var keyProp = null;
  for(var propName in metadata.properties) {
    if(metadata.properties[propName].key) {
      keyProp = metadata.properties[propName];
      break;
    }
  }
  return {

    '_data': [],
    'load': function(d) {
      this._data = this._data.concat(d);
    },
    'add': function(d) {
      this._data.push(d);
      return this._data.length;
    },
    'findAll': function() {
      var ret = this._data;
      return ret;
    },
    'find': function(key) {
      if(!keyProp) {
        throw Error('no key found for metadata');
      }
      var ret = null;
      for(var i = 0; i < this._data.length; i++) {
        if(this._data[i][keyProp.name] === key) {
          ret = this._data[i];
          break;
        }
      }
      return ret;
    },
    'remove': function(key) {
      if(!keyProp) {
        throw Error('no key found for metadata');
      }
      var ret = null;
      for(var i = 0; i < this._data.length; i++) {
        if(this._data[i][keyProp.name] === key) {
          ret = this._data.splice(i, 1)[0];
          break;
        }
      }
      return ret;
    }
  };
};
