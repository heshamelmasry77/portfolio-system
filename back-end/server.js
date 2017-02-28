var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Telling express to use body parser
app.use(bodyParser.json());

// post END POINT
app.post('/api/message', function(req, res) {
    console.log(req.body);
    res.status(200);
});
// app.listen to start the server
// provide the port number by accessing server.address().port
var server = app.listen(5000, function() {
    console.log('listening on port', server.address().port);

});


// BODY PARSER TO READ JSON DATA
