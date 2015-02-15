var ijson;

module.exports = function(json) {
  ijson = json;
  return function(req, res, next) {
    var smodel = null;
    console.log("req.url: " + req.url);
    for(var i = 0; i < ijson[0].models.length; i++) {
      var model = ijson[0].models[i];
      var mpath = '/' + model.name;
      if(req.url.indexOf(mpath) === 0) {
        smodel = model;
        break;
      }
    }
    if(!smodel) {
      console.log("model not found");
      res.end("model not found");
      return;
    }
    console.log("looking at model " + smodel.name);
    res.end("looking at model " + smodel.name);
  };
};
