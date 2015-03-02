var express = require('express');
var path = require('path');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = require('./meta-data/meta-api-rest');
var morgan = require('morgan');
var fs = require('fs');
var filestore = require('./meta-data/file-storage.js');
var metadataMap = require('./meta-data/obj-create.js');

// todo parameterize this to allow production/test alternatives
var json = JSON.parse(fs.readFileSync('test/meta-data.json'));
var metadata = metadataMap(json);

app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());
app.use(methodOverride());
app.use(morgan("dev", { format: 'dev', immediate: true }));
router(app, json, filestore(metadata.findMetadata('User'),'testfile.json'));

http.createServer(app).listen(9999, function() {
    console.log('Server up: http://localhost:' + 9999);
});
