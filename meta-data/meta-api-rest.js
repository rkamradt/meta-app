var ijson;
// REST methods:
// GET returns a list with optional filters
// GET :id returns a single document
// POST :id {doc} updates a single document
// PUT {doc} adds a single document
// DELETE :id deletes a single document

module.exports = function(json) {
  ijson = json;
  return function(req, res, next) {
    var smodel = null;
    for(var i = 0; i < ijson.models.length; i++) {
      var model = ijson.models[i];
      var mpath = '/' + model.name;
      if(req.url.indexOf(mpath) === 0) {
        smodel = model;
        break;
      }
    }
    if(!smodel) {
      res.status(500).send("model " + req.url + " not found\n");
      return;
    }
    if(req.method === 'GET') {
      res.status(200).send("GET processing on model " + req.url + "\n");
    } else if(req.method === 'POST') {
      res.status(200).send("POST processing on model " + req.url + "\n");
    } else if(req.method === 'PUT') {
      res.status(200).send("PUT processing on model " + req.url + "\n");
    } else if(req.method === 'DELETE') {
      res.status(200).send("DELETE processing on model " + req.url + "\n");
    } else {
      res.status(500).send("unrecognized verb");
      return;
    }
  };
};
