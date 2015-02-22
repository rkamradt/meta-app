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

    'data': [],
    'load': function(d, done) {
      this.data = d;
      if(done) { // allow for asynchronous calls
        done();
      }
    },
    'findAll': function(done) {
      var ret = this.data;
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
      for(var i = 0; i < this.data.length; i++) {
        if(this.data[i][keyProp.name] === key) {
          ret = this.data[i];
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
      for(var i = 0; i < this.data.length; i++) {
        if(this.data[i][keyProp.name] === key) {
          ret = this.data.splice(i, 1)[0];
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
