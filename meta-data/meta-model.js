var propertyFactory = require('./meta-property');

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
          return json.properties[propName];
        }
      }
    })(json),
    'getName': function() {
      return this._name;
    },
    'getProperties': function() {
      return this._propertyMap;
    },
    'getProperty': function(name) {
      return this._propertyMap[name];
    },
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
    }
  };
};
