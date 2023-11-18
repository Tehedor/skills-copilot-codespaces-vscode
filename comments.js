// Crete web server
// npm install express --save
var express = require('express');
var app = express();
// Create server
// npm install http --save
var http = require('http').Server(app);
// Create socket
// npm install socket.io --save
var io = require('socket.io')(http);

// Create server
// npm install http --save
var http = require('http').Server(app);
// Create socket
// npm install socket.io --save
var io = require('socket.io')(http);

// npm install body-parser --save
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// npm install mongoose --save
var mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/test');

// Create schema
var commentsSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// Create model
var Comments = mongoose.model('Comments', commentsSchema);

// Create web server
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// Send all comments to client
app.get('/comments', function(req, res){
    Comments.find({}, function(err, comments){
        res.send(comments);
    });
});

// Receive new comment from client
app.post('/comments', function(req, res){
    var newComment = new Comments(req.body);
    newComment.save(function(err){
        if(err) throw err;
        io.emit('newComment', req.body);
        res.sendStatus(200);
    });
});

// Create socket
io.on('connection', function(socket){
    console.log('A user connected');
});

// Start server
http.listen(3000, function(){
    console.log('listening on *:3000');
});
