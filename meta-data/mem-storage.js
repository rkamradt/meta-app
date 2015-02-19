module.exports = function(m) {
  var metadata = m;
  return {

    'data': [],
    'load': function(d, done) {
      this.data = d;
      done();
    },
    'find': function(key) {
      var property = null; // todo prefind the key
      for(var i = 0; i < metadata.properties.length; i++) {
        if(metadata.properties[i].key) {
          property = metadata.properties[i];
          break;
        }
      }
      if(!property) {
        throw Error("no key found for metadata");
      }
      for(i = 0; i < this.data.length; i++) {
        if(this.data[i][property.name] === key) {
          return this.data[i];
        }
      }
      return null;
    }
  };
};
