
module.exports = function(json) {
  return {
    'json': json,
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
