var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// fs is file system
var fs = require('fs');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var multer = require('multer');




// enable CORES, or Cross-Origin Resource Sharing with Express

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});



// Schema for image upload


var Item = new Schema({
    img: {
        data: Buffer,
        contentType: String
    }
});
var ItemSchema = mongoose.model('Clothes', Item);

// var upload = multer({
//     dest: './uploads'
// });

//
// app.use(multer({
//     dest: '. / uploads / ',
//     rename: function(fieldname, filename) {
//         return filename;
//     },
// }));



app.post('/api/photo', function(req, res) {
    var newItem = new ItemSchema();
    // THIS WILL COME FROM ANGULAR FORM
    // newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
    newItem.img.data = fs.readFileSync('/Users/heshamelmasry/Desktop/FerreroRocher.jpg')
    newItem.img.contentType = 'image/png';

    console.log(req.body);

    newItem.save();
    res.status(200);

});



app.get('/api/photo', function(req, res) {


    ItemSchema.find({}).exec(function(err, result) {

        console.log(result);
        res.send(result);
    });
});





// Schema for message
var Message = mongoose.model('Message', {
    msg: String
});
// Telling express to use body parser
app.use(bodyParser.json());


//get END POINT message

app.get('/api/message', GetMessages);

// post END POINT message
app.post('/api/message', function(req, res) {
    console.log(req.body);

    var message = new Message(req.body);
    message.save();
    res.status(200);
});



// Function retrive all the messages
function GetMessages(req, res) {
    Message.find({}).exec(function(err, result) {
        res.send(result); //instead of outputting the result to the console, we will be sending it and the response with "response.send" and we'll just pass in the result
    });
}


mongoose.connect("mongodb://localhost:27017/test", function(err, db) {

    if (!err) {
        console.log("we are connected to mongo");
    }

});


// app.listen to start the server
// provide the port number by accessing server.address().port
var server = app.listen(5000, function() {
    console.log('listening on port', server.address().port);

});


// BODY PARSER TO READ JSON DATA
