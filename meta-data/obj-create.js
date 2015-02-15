var ijson;

module.exports = function(json) {
  ijson = json;
  return function(model, data) {
    var ret = null;
    var metadata = null;
    for(var i = 0; i < ijson[0].models.length; i++) {
      if(model === ijson[0].models[i].name) {
        metadata = ijson[0].models[i];
        break;
      }
    }
    if(!metadata) {
      throw "model " + model + " not found";
    }
    ret = {};
    for(i = 0; i < metadata.properties.length; i++) {
      var property = metadata.properties[i];
      if(!property.name) {
        throw "model " + model + " has nameless property";
      }
      if(property.deflt) {
        ret[property.name] = property.deflt;
      }
    }
    if(data) {
      for(var p in data) {
        var found = false;
        for(i = 0; i < metadata.properties.length; i++) {
          var prop = metadata.properties[i];
          if(p === prop.name) {
            found = true;
            break;
          }
        }
        if(!found) {
          throw "property " + p + " in data not found in model";
        }
        ret[p] = data[p];
      }
    }
    return ret;
  };
};
