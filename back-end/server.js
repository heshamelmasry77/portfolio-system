var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// Schema for message
var Message = mongoose.model('Message', {
    msg: String
});
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

    var message = new Message(req.body);
    message.save();
    res.status(200);
});

// Function retrive all the messages
function GetMessages() {
    Message.find({}).exec(function(err, result) {
        console.log(result);
    });
}


mongoose.connect("mongodb://localhost:27017/test", function(err, db) {

    if (!err) {
        console.log("we are connected to mongo");
        GetMessages(); // calling  Function retrive all the messages

    }

});


// app.listen to start the server
// provide the port number by accessing server.address().port
var server = app.listen(5000, function() {
    console.log('listening on port', server.address().port);

});


// BODY PARSER TO READ JSON DATA
