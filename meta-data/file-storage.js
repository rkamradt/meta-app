/**
 *
 * Copyright 2015 Randal L Kamradt Sr.
 *
 * File Storage.
 * @module meta-data/file-storage
 */
var fs = require('fs');
/**
 * A file store API.
 * @param  {Object} m        The model description
 * @param  {String} fileName The file to use as a store
 * @return {Object}          The API Object
 */
module.exports = function(m, fileName) {
  var keyProp = null;
  for(var propName in m.properties) {
    if(m.properties[propName].key) {
      keyProp = m.properties[propName];
      break;
    }
  }
  return {
    '_key': keyProp,
    '_fileStore': fileName,
    '_data': [],
    '_readData': function(done) {
      var self = this;
      fs.exists(this._fileStore, function(exists) {
        if(!exists) {
          self._data = []; // no file; assume empty
          done();
        } else {
          fs.readFile(self._fileStore, function(err, data) {
            if(err) {
              done(err);
            } else {
              self._data = JSON.parse(data);
              done();
            }
          });
        }
      });
    },
    '_writeData': function(done, result) {
      var data = JSON.stringify(this._data);
      fs.writeFile(this._fileStore, data, function(err) {
        if(err) {
          done(err);
        } else {
          done(null, result);
        }
      });
    },
    /**
     * load an array of data into a store
     * @param  {Array}   d    The data to load
     * @param  {Function} done The callback when done
     */
    'load': function(d, done) {
      var self = this;
      this._readData(function(err) {
        if(err) {
          done(err);
        }
        self._data = self._data.concat(d);
        self._writeData(done);
      });
    },
    /**
     * add an item to the store
     * @param  {Object}   d    The item to store
     * @param  {Function} done The callback when done
     */
    'add': function(d, done) {
      var self = this;
      this._readData(function(err) {
        if(err) {
          done(err);
        }
        self._data.push(d);
        var ret = self._data.length;
        self._writeData(done, ret);
      });
    },
    /**
     * return the entire store as an Array
     * @param  {Function} done The callback when done
     */
    'findAll': function(done) {
      var self = this;
      this._readData(function(err) {
        if(err) {
          done(err);
        }
        var ret = self._data.concat([]); // make a shallow copy
        self._writeData(done, ret);
      });
    },
    /**
     * return an item by id
     * @param  {String}   key  The key value
     * @param  {Function} done The callback when done
     */
    'find': function(key, done) {
      if(!this._key) {
        done('no key found for metadata');
        return;
      }
      var self = this;
      this._readData(function(err) {
        if(err) {
          done(err);
        }
        var ret = null; // if not found return null
        for(var i = 0; i < self._data.length; i++) {
          if(self._data[i][self._key.name] === key) {
            ret = self._data[i];
            break;
          }
        }
        self._writeData(done, ret);
      });
    },
    /**
     * Remove an item by key
     * @param  {String}   key  The key value
     * @param  {Function} done The callback when done
     */
    'remove': function(key, done) {
      if(!this._key) {
        done('no key found for metadata');
        return;
      }
      var self = this;
      this._readData(function(err) {
        if(err) {
          done(err);
        }
        var ret = null; // if not found, do nothing and return null
        for(var i = 0; i < self._data.length; i++) {
          if(self._data[i][self._key.name] === key) {
            ret = self._data.splice(i, 1)[0];
            break;
          }
        }
        self._writeData(done, ret);
      });
    }
  };
};
