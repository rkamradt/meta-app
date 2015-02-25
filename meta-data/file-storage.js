var fs = require('fs');

module.exports = function(m, fileName) {
  var metadata = m;
  var keyProp = null;
  for(var propName in metadata.properties) {
    if(metadata.properties[propName].key) {
      keyProp = metadata.properties[propName];
      break;
    }
  }
  var fileStore = fileName;
  return {

    '_data': [],
    '_readData': function(done) {
      var self = this;
      fs.exists(fileStore, function(exists) {
        if(!exists) {
          self._data = []; // no file; assume empty
          done();
        } else {
          fs.readFile(fileStore, function(err, data) {
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
      fs.writeFile(fileStore, data, function(err) {
        if(err) {
          done(err);
        } else {
          done('', result);
        }
      });
    },
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
    'find': function(key, done) {
      if(!keyProp) {
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
          if(self._data[i][keyProp.name] === key) {
            ret = self._data[i];
            break;
          }
        }
        self._writeData(done, ret);
      });
    },
    'remove': function(key, done) {
      if(!keyProp) {
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
          if(self._data[i][keyProp.name] === key) {
            ret = self._data.splice(i, 1)[0];
            break;
          }
        }
        self._writeData(done, ret);
      });
    }
  };
};
