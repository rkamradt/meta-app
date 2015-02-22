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
      if(done) { // allow for asynchronous calls
        done();
      }
    },
    'add': function(d, done) {
      this._data.push(d);
      if(done) { // allow for asynchronous calls
        done();
      }
      return this._data.length;
    },
    'findAll': function(done) {
      var ret = this._data;
      if(done) { // allow for asynchronous calls
        done();
      }
      return ret;
    },
    'find': function(key, done) {
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
      if(done) { // allow for asynchronous calls
        done();
      }
      return ret;
    },
    'remove': function(key, done) {
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
      if(done) { // allow for asynchronous calls
        done();
      }
      return ret;
    }
  };
};
