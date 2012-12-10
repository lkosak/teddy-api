var express = require('express');
var app = express();

var mongodb = require('mongodb');
var server = new mongodb.Server("127.0.0.1", 27017, {});
var talks;

new mongodb.Db('tedder', server, {w: 1}).open(function (error, client) {
  if (error) throw error;

  talks = new mongodb.Collection(client, 'talks');
});


app.get('/v1/talks', function(req, res) {
  var offset = req.query['offset'] || 0
  var limit = req.query['limit'] || 30

  talks.find({}, { skip: offset, limit: limit }).sort({ published_on: -1 }).toArray(function(err, items) {
    output = JSON.stringify(items);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(output);
  });
});

app.listen(3000);
