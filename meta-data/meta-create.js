/**
 * An API for dealing with object manipulation
 * @param  {Object} json The data definition
 * @return {Object}      The API object
 */
module.exports = function(json) {
  return {
    'json': json,
    /**
     * Find a model with a given name
     * @param  {String} modelName the model name
     * @return {Object}           the Model
     */
    'findMetadata': function(modelName) {
      var metadata = null;
      for(var propName in this.json.models) {
        if(modelName === this.json.models[propName].name) {
          metadata = this.json.models[propName];
          break;
        }
      }
      if(!metadata) {
        throw Error('model ' + modelName + ' not found');
      }
      return metadata;
    },
    /**
     * Apply data values to an object
     * @param  {Object} obj      The Object to update
     * @param  {Object} data     The data to apply
     * @param  {Object} metadata The meta-data
     */
    'apply': function(obj, data, metadata) {
      for(var p in data) {
        var found = false;
        for(var propName in metadata.properties) {
          var prop = metadata.properties[propName];
          if(p === prop.name) {
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
     * @param  {String} modelName The model to use
     * @param  {Object} data      The data to optionally apply
     * @return {Object}           The new object
     */
    'create': function(modelName, data) {
      var metadata = this.findMetadata(modelName);
      var ret = {};
      for(var propName in metadata.properties) {
        var property = metadata.properties[propName];
        if(!property.name) {
          throw Error('model ' + model + ' has nameless property');
        }
        if(property.deflt) {
          ret[property.name] = property.deflt;
        }
      }
      if(data) {
        this.apply(ret, data, metadata);
      }
      return ret;
    }
  };
};
