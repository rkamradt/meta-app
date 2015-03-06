/**
 *
 * Copyright 2015 Randal L Kamradt Sr.
 *
 * Meta App.
 * @module index
 */
var fileStore = require('./meta-data/file-storage');
var memoryStore = require('./meta-data/mem-storage');
var mongoStore = require('./meta-data/mongo-storage');
var metaCreate = require('./meta-data/meta-create');
var metaRest = require('./meta-data/meta-rest');

/**
 * Create the API for the meta-app library. Aggregates all of
 * methods for createing memory/file/mongo stores along with
 * an object creator and a router to use with Express.js
 *
 * Todo: create a single createStore that takes a type as a
 * parameter.
 *
 * @param  {Object} models basic JSON object that describes the data
 * @return {Object}        The API object
 */
module.exports = function(models) {
  return {
    "models": models,
    /**
     * Creates a file store
     * @param  {String} fileName The file to use to store the data in
     * @return {Object}          A store object that is backed by a file
     */
    "createFileStore": function(fileName) {
        return fileStore(this.models, fileName);
    },
    /**
     * Creates a memory store
     * @return {Object} A store object that is backed by memory
     */
    "createMemoryStore": function() {
        return memoryStore(this.models);
    },
    /**
     * Create mongo store
     * @param  {String} url            The URL to the mongo database
     * @param  {String} collectionName The collection to use
     * @return {Object}                A store object that is backed by a Mongo Database
     */
    "createMongoStore": function(url, collectionName) {
        return mongoStore(this.models, url, collectionName);
    },
    /**
     * A Object manipulation API
     * @return {Object} The API object
     */
    "objectCreator": function() {
      return metaCreate(this.models);
    },
    /**
     * An express router that will create a web service
     * @param  {Object} app   The Express object
     * @param  {Object} store One of the stores created by this API
     */
    "useMetaRest": function(app, store) {
      metaRest(app, this.models, store);
    }
  };
};
