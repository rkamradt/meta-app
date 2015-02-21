
module.exports = function(json) {
  return {
    'json': json,
    'findMetadata': function(modelName) {
      var metadata = null;
      for(var i = 0; i < this.json.models.length; i++) {
        if(modelName === this.json.models[i].name) {
          metadata = this.json.models[i];
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
        for(var i = 0; i < metadata.properties.length; i++) {
          var prop = metadata.properties[i];
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
      for(var i = 0; i < metadata.properties.length; i++) {
        var property = metadata.properties[i];
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
