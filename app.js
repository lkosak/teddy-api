var express = require('express');
var app = express();
var config = require('./config')

var mongojs = require('mongojs');
var mongo_url = process.env.MONGOHQ_URL || config.mongo_url;

var db = mongojs(mongo_url, ['talks'])

app.get('/v1/talks', function(req, res) {
  var offset = req.query['offset'] || 0
  var limit = req.query['limit'] || 30

  db.talks.find({}, { skip: offset, limit: limit }).sort({ published_on: -1 }, function(err, docs) {
    output = JSON.stringify(docs);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(output);
  });
});

var port = process.env.PORT || config.port;

app.listen(port);
