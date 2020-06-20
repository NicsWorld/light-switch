var http = require('http');
var express = require('express');
var piblaster = require('pi-blaster.js');
var cors = require("cors");
var app = express();
// ------------------------------------------------------------------------
// configure Express to serve index.html and any other static pages stored
// in the home directory
app.use(express.static(__dirname));
app.use(cors());
app.get('/instructions', function(req, res) {
       console.log("instructions");
 });

app.get('/on', function(req, res) {
       piblaster.setPwm(17, 0.2);
       res.end('on');
 });

app.get('/off', function(req, res) {
       piblaster.setPwm(17, 0.1);
       res.end('off');
 });

app.get('*', function (req, res) {
       res.status(404).send('Unrecognised API call');
});

app.use(function (err, req, res, next) {
 if (req.xhr) {
       res.status(500).send('Oops, Something went wrong!');
 } else {
       next(err);
 }
}); // apt.use()


//------------------------------------------------------------------------
//on clrl-c, put stuff here to execute before closing your server with ctrl-c
process.on('SIGINT', function() {
 var i;
 console.log("\nGracefully shutting down from SIGINT (Ctrl+C)");
 process.exit();
});

// ------------------------------------------------------------------------
// Start Express App Server
//
app.listen(3001);
console.log('App Server is listening on port 3000');
