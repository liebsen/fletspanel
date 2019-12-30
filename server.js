#!/usr/bin/env node
var express = require('express');
var path = require('path');
var compression = require('compression');
var sslRedirect = require('heroku-ssl-redirect');
var bodyParser = require('body-parser');
var app = express();

app.use(sslRedirect());
app.use(compression());
// Set static files
//app.use(express.static('dist'));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/dist',{
    maxAge: "1d"
}))

app.get('*', function(req, res){
	res.sendFile('index.html', { root: __dirname + '/dist' });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening at http://localhost:' + server.address().port);
});