/**
 *
 * Copyright 2015 Randal L Kamradt Sr.
 *
 * Meta-data property definition.
 * @module meta-data/meta-property
 */
var propertyFactory = require('./meta-property');
/**
 * factory for creating a model definition from json. pre-calculates
 * the map of properties and the key property
 *
 * @param  {Object} json the parsed json that defines the model
 * @return {Object}      An API Object
 */
module.exports = function(json) {
  return {
    '_json': json,
    '_name': json.name,
    '_propertyMap': (function(json) {
      var ret = {};
      for(var propName in json.properties) {
        ret[json.properties[propName].name] =
          propertyFactory(json.properties[propName]);
      }
      return ret;
    })(json),
    '_key': (function(json) {
      for(var propName in json.properties) {
        if(json.properties[propName].key) {
          return propertyFactory(json.properties[propName]);
        }
      }
    })(json),
    /**
     * return the name of this model
     * @return {string} the name of this model
     */
    'getName': function() {
      return this._name;
    },
    /**
     * returns the property map
     * @return {Object} the property map
     */
    'getProperties': function() {
      return this._propertyMap;
    },
    /**
     * returns a named property
     * @param  {string} name the name of the property
     * @return {Object}      the named property
     */
    'getProperty': function(name) {
      return this._propertyMap[name];
    },
    /**
     * returns the key property
     * @return {Object} the key property
     */
    'getKey': function() {
      return this._key;
    },
    /**
     * Apply data values to an object
     * @param  {Object} obj      The Object to update
     * @param  {Object} data     The data to apply
     */
    'apply': function(obj, data) {
      for(var p in data) {
        var found = false;
        for(var propName in this.getProperties()) {
          var prop = this.getProperty(propName);
          if(p === prop.getName()) {
            found = true;
            break;
          }
        }
        if(!found) {
          throw Error('property ' + p + ' in data not found in model');
        }
        obj[p] = data[p];
      }
    },
    /**
     * Create a new data object that conforms to the data defintion
     * @param  {Object} data      The data to optionally apply
     * @return {Object}           The new object
     */
    'create': function(data) {
      var ret = {};
      for(var propName in this.getProperties()) {
        var prop = this.getProperty(propName);
        if(prop.getDefaultValue()) {
          ret[prop.getName()] = prop.getDefaultValue();
        }
      }
      if(data) {
        this.apply(ret, data);
      }
      return ret;
    },
    /**
     * determines if an object complies with all the rules for
     * this model.
     *
     * TODO think about how this returns information about how
     * an object is invalid and all the possible reasons an
     * object might be invalid
     *
     * @param  {Object} data The object in question
     * @return {boolean}     True if the object is valid
     */
    'isValid': function(data) {
      for(var propName in data) {
        var prop = this.getProperty(propName);
        if(!prop) { // should we have a flag that allows un-named propertys?
          throw Error('unknown property ' + propName);
        }
        if(!prop.isValid(data[propName])) {
          return false; // we should return information about why?
        }
      }
      return true;
    }
  };
};
