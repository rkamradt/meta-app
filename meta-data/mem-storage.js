/**
 * A memory store API.
 * @param  {Object} m        The model description
 * @return {Object}          The API Object
 */
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
    /**
     * load an array of data into a store
     * @param  {Array}   d    The data to load
     * @param  {Function} done The callback when done
     */
    'load': function(d, done) {
      this._data = this._data.concat(d);
      done();
    },
    /**
     * add an item to the store
     * @param  {Object}   d    The item to store
     * @param  {Function} done The callback when done
     */
    'add': function(d, done) {
      this._data.push(d);
      var ret = this._data.length;
      done(null, ret);
    },
    /**
     * return the entire store as an Array
     * @param  {Function} done The callback when done
     */
    'findAll': function(done) {
      var ret = this._data.concat([]); // make a shallow copy
      done(null, ret);
    },
    /**
     * return an item by id
     * @param  {String}   key  The key value
     * @param  {Function} done The callback when done
     */
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
    /**
     * Remove an item by key
     * @param  {String}   key  The key value
     * @param  {Function} done The callback when done
     */
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
