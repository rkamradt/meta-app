var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/myproject';

module.exports = function(m, collectionName) {
  var keyProp = null;
  for(var propName in m.properties) {
    if(m.properties[propName].key) {
      keyProp = m.properties[propName];
      break;
    }
  }
  return {
    '_key': keyProp,
    '_collectionName': collectionName,
    '_db': null,
    '_collection': null,
    '_readCollection': function(done) {
      var self = this;
      MongoClient.connect(url, function(err, db) {
        if(err) {
          done(err);
          return;
        }
        self._db = db;
        self._collection = db.collection('documents');
        done();
      });
    },
    'load': function(d, done) {
      var self = this;
      this._readCollection(function(err) {
        if(err) {
          done(err);
        }
        self._collection.insert(d, function(err, result) {
          self._db.close();
          if(err) {
            done(err);
          } else {
            done(null, result.length);
          }
        });
      });
    },
    'add': function(d, done) {
      var self = this;
      this._readCollection(function(err) {
        if(err) {
          done(err);
        }
        var ad = [];
        ad.push(d);
        self._collection.insert(ad, function(err, result) {
          self._db.close();
          if(err) {
            done(err);
          } else {
            done(null, result.length);
          }
        });
      });
    },
    'findAll': function(done) {
      var self = this;
      this._readCollection(function(err) {
        if(err) {
          done(err);
        }
        self._collection.find({}).toArray(function(err, docs) {
          self._db.close();
          if(err) {
            done(err);
          } else {
            done(null, docs);
          }
        });
      });
    },
    'find': function(key, done) {
      if(!this._key) {
        done('no key found for metadata');
        return;
      }
      var self = this;
      this._readCollection(function(err) {
        if(err) {
          done(err);
        }
        var kobj = {};
        kobj[self._key.name] = key;
        self._collection.find(kobj).toArray(function(err, docs) {
          self._db.close();
          var ret;
          if(!err && docs.length !== 0) {
            ret = docs[0];
          }
          self._db.close();
          done(err, ret);
        });
      });
    },
    'remove': function(key, done) {
      if(!this._key) {
        done('no key found for metadata');
        return;
      }
      var self = this;
      this._readCollection(function(err) {
        if(err) {
          done(err);
        }
        var kobj = {};
        kobj[self._key.name] = key;
        self._collection.find(kobj).toArray(function(err, docs) {
          var ret;
          if(!err && docs.length !== 0) {
            ret = docs[0];
          }
          self._collection.remove(kobj, function(err, result) {
            self._db.close();
            done(err, ret);
          });
        });
      });
    }
  };
};
