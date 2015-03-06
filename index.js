var fileStore = require('./meta-data/file-storage');
var memoryStore = require('./meta-data/mem-storage');
var mongoStore = require('./meta-data/mongo-storage');
var metaCreate = require('./meta-data/meta-create');
var metaRest = require('./meta-data/meta-rest');


module.exports = function(models) {
  return {
    "models": models,
    "createFileStore": function(fileName) {
        return fileStore(this.models, fileName);
    },
    "createMemoryStore": function() {
        return memoryStore(this.models);
    },
    "createMongoStore": function(url, collectionName) {
        return mongoStore(this.models, url, collectionName);
    },
    "objectCreator": function() {
      return metaCreate(this.models);
    },
    "useMetaRest": function(app, store) {
      metaRest(app, this.models, store);
    }
  };
};
