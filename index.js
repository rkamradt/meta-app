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
var modelsFactory = require('./meta-data/meta-models');
var metaRest = require('./meta-data/meta-rest');

/**
 * Create the API for the meta-app library. Aggregates all of
 * methods for createing memory/file/mongo stores along with
 * an object creator and a router to use with Express.js
 *
 * Todo: create a single createStore that takes a type as a
 * parameter.
 *
 * @param  {Object} json   basic JSON object that describes the data
 * @return {Object}        The API object
 */
module.exports = function(json) {
  return {
    '_models': modelsFactory(json),
    /**
     * Creates a file store
     * @param  {string} modelName The model in the models
     * @param  {string} fileName The file to use to store the data in
     * @return {Object}          A store object that is backed by a file
     */
    'createFileStore': function(modelName, fileName) {
        return fileStore(this._models.getModel(modelName), fileName);
    },
    /**
     * Creates a memory store
     * @param  {string} modelName The model in the models
     * @return {Object} A store object that is backed by memory
     */
    'createMemoryStore': function(modelName) {
        return memoryStore(this._models.getModel(modelName));
    },
    /**
     * Create mongo store
     * @param  {string} modelName      The model in the models
     * @param  {string} url            The URL to the mongo database
     * @param  {string} collectionName The collection to use
     * @return {Object}                A store object that is backed by a Mongo Database
     */
    'createMongoStore': function(modelName, url, collectionName) {
        return mongoStore(this._models.getModel(modelName), url, collectionName);
    },
    /**
     * A Object manipulation API
     * @return {Object} The API object
     */
    'modelsFactory': function() {
      return this._models;
    },
    /**
     * An express router that will create a web service
     * @param  {Object} app   The Express object
     * @param  {Object} store One of the stores created by this API
     */
    'useMetaRest': function(app, store) {
      metaRest(app, this._models, store);
    }
  };
};
