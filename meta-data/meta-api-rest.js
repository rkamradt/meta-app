// REST methods:
// GET returns a list with optional filters
// GET :id returns a single document
// POST :id {doc} updates a single document
// PUT {doc} adds a single document
// DELETE :id deletes a single document

var createRoutes = function(app, model, store) {
  var key;
  for(var propName in model.properties) {
    if(model.properties[propName].key) {
      key = model.properties[propName].name;
    }
  }
  if(!key) { // ignore models without keys
    return;
  }
  app.get('/' + model.name, function(req, res) {
    store.findAll(function(err, result) {
      if(err) {
        res.status(500).send(err);
      } else {
        res.status(200).type('json').send(JSON.stringify(result));
      }
      res.end();
    });
  });
  app.get('/' + model.name + '/:id', function(req, res) {
    store.find(req.params.id, function(err, result) {
      if(err) {
        console.log('in get err = ' + err);
        res.status(500).send(err);
      } else {
        if(!result) {
          res.status(404);
        } else {
          res.status(200).type('json').send(JSON.stringify(result));
        }
      }
      res.end();
    });
  });
  app.post('/' + model.name + '/:id', function(req, res) {
    var item = JSON.parse(req.body);
    item[key] = req.params.id; // ensure id matches
    store.find(req.params.id, function(err, result) {
      if(err) {
        res.status(500).send(err);
        res.end();
      } else {
        if(!result) {
          res.status(404);
          res.end();
        } else {
          store.remove(req.params.id, function(err, result) {
            if(err) {
              res.status(500).send(err);
              res.end();
            } else {
              store.add(item, function(err, result) {
                if(err) {
                  res.status(500).send(err);
                } else {
                  res.status(200);
                }
                res.end();
              });
            }
          });
        }
      }
    });
  });
  app.put('/' + model.name, function(req, res) {
    var item = req.body;
    store.add(item,function(err, result) {
      if(err) {
        res.status(500).send(err);
      } else {
        res.status(200);
      }
      res.end();
    });
  });
  app.delete('/' + model.name + '/:id', function(req, res) {
    store.remove(req.params.id, function(err, result) {
      if(err) {
        res.status(500).send(err);
      } else {
        res.status(200);
      }
      res.end();
    });
  });
};

module.exports = function(app, json, store) {
  for(var modelName in json.models) {
    createRoutes(app, json.models[modelName], store);

  }
};
