/**
 *
 * Copyright 2015 Randal L Kamradt Sr.
 *
 * Sample App.
 * @module index
 */
var express = require('express');
var http = require('http');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var metaAppFactory = require('meta-app');
var morgan = require('morgan');

var json = JSON.parse(fs.readFileSync('meta-data.json'));
var metaApp = metaAppFactory(json);

app.use(bodyParser.urlencoded({extended: true}));

 // parse application/json
app.use(bodyParser.json());
app.use(methodOverride());
app.use(morgan('dev', { format: 'dev', immediate: true }));
metaApp.useMetaRest(app, metaApp.createMongoStore('User', 'mongodb://localhost:27017/myproject', 'sample'));

http.createServer(app).listen(9999, function() {
 console.log('Server up: http://localhost:' + 9999);
});
