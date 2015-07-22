#!/usr/local/bin/node
//
// Added code to create nodejs instances depend on number of cpus
//
var cluster = require("cluster");
var numCPUs = require("os").cpus().length;
var http = require('http');
var https = require('https');
var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();

// set http port to 8080 instead of 80
var http_port = 8080;

// set https port to 8443 instead of 443
var https_port = 8443;

// key.pem and cert.pem are created as follows:
//
// from http://stackoverflow.com/questions/10175812/how-to-create-a-self-signed-certificate-with-openssl
// 
// You can create key and cert in one command:
// openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days XXX
// where XXX is a number, say 100
//
// You can add -nodes if you don't want to protect your private key with a passphrase.
//
// To list the pem contents try:
// openssl x509 -noout -in certs/cert.pem  -text
// openssl x509 -noout -in certs/key.pem  -text

// these options will be passed to createServer
var options = {
	key: fs.readFileSync('certs/key.pem'),
	cert: fs.readFileSync('certs/cert.pem')
};

// full path of current working directory, all paths must begin with '/'
var cwd = process.cwd();

// default document root
var document_root = cwd;

// set program_name
var program_name = path.basename(__filename);

if (program_name.indexOf('.js') >=0) {
	program_name = program_name.slice(0, -3);   // remove extension
}

// cluster does fork and exec automatically
if (cluster.isMaster) {
	// parent code

	// create works based on number of cpus in the machine
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	// set online handler
	cluster.on('online', function(worker) {
		console.log( 'Worker ' + worker.process.pid + ' is online.' );	
	});

	// set dead handler
	cluster.on("exit", function(worker, code, signal) {
		console.log( 'worker ' + worker.process.pid + ' died.' );
		cluster.fork();
	});
} else { 
	// child code

	// use static module to automatically return files under /* folder
	//app.use('/static', express.static(document_root + '/static'));
        app.use('/js',express.static(document_root + '/js'));
        app.use('/css',express.static(document_root + '/css'));     
        app.use('/components',express.static(document_root + '/components'));
        app.use('/partials', express.static(document_root + '/partials'));
        app.use('/resourceJs',express.static(document_root + '/resourceJS'));
        app.use('/templates',express.static(document_root + '/templates'));
        app.use('/images', express.static(document_root + '/images'));
        app.use('/html', express.static(document_root + '/html'));
        app.use('/bower_components', express.static(document_root + '/bower_components'));     
 
	// handle explicit path index.html
	app.get('/index.html', function(req, res) {
		console.log('index.html');
                console.log('Path: ' + cwd);
		var filePath = cwd + '/' + 'index.html';
		res.sendFile(filePath);
	});

	// handle default '/'
	app.get('/', function(req, res) {
		var filePath = cwd + '/' + 'index.html';
		res.sendFile(filePath);
	});

	// server creations
	
	// create a http server listens to port 8080
	var http_server = http.createServer(app).listen(http_port);

	// create a https server listens to port 8443
	// using the certs and keys as in the options hash
	var https_server = https.createServer(options, app).listen(https_port);

	// set error handler in case listen to 8080 fails
	http_server.on('error', function (e) {
		if (e.code == 'EADDRINUSE') {
			console.log('Address in use, exiting...');
			consoler.log('Failed to start http server: address in use.');
		} else {
			console.log('Unable to start http server, exiting...');
		}
	});

	// set error handler in case listen to 8443 fails
	https_server.on('error', function (e) {
		if (e.code == 'EADDRINUSE') {
			console.log('Address in use, exiting...');
			consoler.log('Failed to start https server: address in use.');
		} else {
			console.log('Unable to start https server, exiting...');
		}
	});

	// log starting messages
	console.log(new Date().toLocaleString() + ': ' + 'Server running at http://127.0.0.1:' + http_port + '/' + ' and https://127.0.0.1: ' + https_port);

}
