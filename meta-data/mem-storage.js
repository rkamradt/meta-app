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
    'load': function(d, done) {
      this._data = this._data.concat(d);
      done();
    },
    'add': function(d, done) {
      this._data.push(d);
      var ret = this._data.length;
      done(null, ret);
    },
    'findAll': function(done) {
      var ret = this._data.concat([]); // make a shallow copy
      done(null, ret);
    },
    'find': function(key, done) {
      if(!keyProp) {
        done('no key found for metadata');
        return;
      }
      var ret = null; // if not found return null
      for(var i = 0; i < this._data.length; i++) {
        if(this._data[i][keyProp.name] === key) {
          ret = this._data[i];
          break;
        }
      }
      done(null, ret);
    },
    'remove': function(key, done) {
      if(!keyProp) {
        done('no key found for metadata');
        return;
      }
      var ret = null; // if not found, do nothing and return null
      for(var i = 0; i < this._data.length; i++) {
        if(this._data[i][keyProp.name] === key) {
          ret = this._data.splice(i, 1)[0];
          break;
        }
      }
      done(null, ret);
    }
  };
};
