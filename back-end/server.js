var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;

var database;
// Telling express to use body parser
app.use(bodyParser.json());


// enable CORES, or Cross-Origin Resource Sharing with Express

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// post END POINT
app.post('/api/message', function(req, res) {
    console.log(req.body);
    database.collection('messages').insertOne(req.body);
    res.status(200);
});

mongo.connect("mongodb://localhost:27017/test", function(err, db) {

    if (!err) {
        console.log("we are connected to mongo");
        database = db;

    }

});


// app.listen to start the server
// provide the port number by accessing server.address().port
var server = app.listen(5000, function() {
    console.log('listening on port', server.address().port);

});


// BODY PARSER TO READ JSON DATA
