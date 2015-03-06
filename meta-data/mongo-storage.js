/**
 *
 * Copyright 2015 Randal L Kamradt Sr.
 *
 * Mongo Storage.
 * @module meta-data/mongo-storage
 */
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

/**
 * A store API backed by mongo database
 * @param  {Object} m              The model description
 * @param  {String} url            The Mongo URL
 * @param  {String} collectionName The Mongo Collection
 * @return {Object}                The API Object
 */
module.exports = function(m, url, collectionName) {
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
    '_url': url,
    '_getCollection': function(done) {
      var self = this;
      MongoClient.connect(this._url, function(err, db) {
        if(err) {
          done(err);
          return;
        }
        self._db = db;
        self._collection = db.collection(self._collectionName);
        done();
      });
    },
    /**
     * load an array of data into a store
     * @param  {Array}   d    The data to load
     * @param  {Function} done The callback when done
     */
    'load': function(d, done) {
      var self = this;
      this._getCollection(function(err) {
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
    /**
     * add an item to the store
     * @param  {Object}   d    The item to store
     * @param  {Function} done The callback when done
     */
    'add': function(d, done) {
      var self = this;
      this._getCollection(function(err) {
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
    /**
     * return the entire store as an Array
     * @param  {Function} done The callback when done
     */
    'findAll': function(done) {
      var self = this;
      this._getCollection(function(err) {
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
      this._getCollection(function(err) {
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
      this._getCollection(function(err) {
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
