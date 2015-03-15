# meta-app

### A meta-data base application framework

Usage:
```javascript
var json = JSON.parse(fs.readFileSync('meta-data.json'));
var metaApp = require('meta-app')(json);
//create a memory store:
var memstore = metaApp.createMemoryStore();
//create a file store:
var filestore = metaApp.createFileStore('filename.json');
//create a mongo store:
var mongostore = metaApp.createMongoStore('mongodb://localhost:27017/myproject', 'testCollection');
//create a restful web service:

var express = require('express');

// ... add necessary middleware

metaApp.useMetaRest(app, mongostore); // create a rest ws that stores to mongo
```
The API docs can be found [here](http://rkamradt.github.io/meta-app/doc)
The current code coverage can be found [here](http://rkamradt.github.io/meta-app/coverage)  
