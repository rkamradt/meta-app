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
      // todo read data an apply to model
    }
    return ret;
  };
};
