/**
 *
 * Copyright 2015 Randal L Kamradt Sr.
 *
 * Object creation.
 * @module meta-data/meta-create
 */
/**
 * An API for dealing with object manipulation
 * @param  {Object} json The data definition
 * @return {Object}      The API object
 */
 var modelFactory = require('./meta-model');

module.exports = function(json) {
  return {
    '_json': json,
    '_modelMap': (function(json) {
      var ret = {};
      for(var propName in json.models) {
        ret[json.models[propName].name] =
          modelFactory(json.models[propName]);
      }
      return ret;
    })(json),
    'getModels': function() {
      return this._modelMap;
    },
    /**
     * Find a model with a given name
     * @param  {String} modelName the model name
     * @return {Object}           the Model
     */
    'getModel': function(modelName) {
      var metadata = this._modelMap[modelName];
      if(!metadata) {
        throw Error('model ' + modelName + ' not found');
      }
      return metadata;
    },
    /**
     * Apply data values to an object
     * @param  {string} modelName The modelname
     * @param  {Object} obj      The Object to update
     * @param  {Object} data     The data to apply
     */
    'apply': function(modelName, obj, data) {
      var model = this.getModel(modelName);
      model.apply(obj, data);
    },
    /**
     * Create a new data object that conforms to the data defintion
     * @param  {String} modelName The model to use
     * @param  {Object} data      The data to optionally apply
     * @return {Object}           The new object
     */
    'create': function(modelName, data) {
      var model = this.getModel(modelName);
      return model.create(data);
    }
  };
};
