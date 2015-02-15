var ijson;

module.exports = function(json) {
  ijson = json;
  return function(req, res, next) {
    var smodel = null;
    for(var i = 0; i < ijson[0].models.length; i++) {
      var model = ijson[0].models[i];
      var mpath = '/' + model.name;
      if(req.url.indexOf(mpath) === 0) {
        smodel = model;
        break;
      }
    }
    if(!smodel) {
      res.end("model not found");
      return;
    }
    res.end("looking at model " + smodel.name);
  };
};
