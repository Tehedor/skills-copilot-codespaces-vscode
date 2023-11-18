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
