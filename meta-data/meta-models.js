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
 /**
  * factory for creating a set of model definitions from json.
  * This is mostly a container for a set of model definitions
  * and most functionality is in the model definitions themselves.
  *
  * @param  {Object} json the parsed json that defines the model
  * @return {Object}      An API Object
  */
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
  };
};
