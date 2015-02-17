
module.exports = function(json) {
  return {
    'json': json,
    'findMetaData': function(modelName) {
      var metadata = null;
      for(var i = 0; i < this.json[0].models.length; i++) {
        if(modelName === this.json[0].models[i].name) {
          metadata = this.json[0].models[i];
          break;
        }
      }
      if(!metadata) {
        throw "model " + modelName + " not found";
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
          throw "property " + p + " in data not found in model";
        }
        obj[p] = data[p];
      }
    },
    'create': function(modelName, data) {
      var metadata = this.findMetaData(modelName);
      var ret = {};
      for(var i = 0; i < metadata.properties.length; i++) {
        var property = metadata.properties[i];
        if(!property.name) {
          throw "model " + model + " has nameless property";
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
