var express = require('express');
var path = require('path');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = require('./meta-data/meta-api-rest');
var morgan = require('morgan');
var fs = require('fs');
// todo parameterize this to allow production/test alternatives
var json = JSON.parse(fs.readFileSync('test/meta-data.json'));

app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());
app.use(methodOverride());
app.use(morgan("dev", { format: 'dev', immediate: true }));
app.use(router(json));
app.use('/', express.static(path.join(__dirname, 'dist')));

http.createServer(app).listen(9999, function() {
    console.log('Server up: http://localhost:' + 9999);
});
