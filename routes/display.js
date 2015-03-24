var Check = require('../models/check');
var net = require('net');
var fs = require('fs');
var WebSocketServer = require('ws').Server;
var express = require('express');
var router = express.Router();
var port = 3001;

//var model = {
//    html = '<a href="#">Link</a>',
//    jquery = true,
//    jqueryui = false,
//    bootstrap = true,
//    bootstrapscript = false
//};
var model = {};

// GET
router.get('/', function(req, res, _) {
    res.render('display', model);
});

// POST
router.post('/', function(req, res, _) {
    model = req.body;
    client.send('refresh');
    res.writeHead(202, { 'Content-Type': 'plain/text' });
    res.end();
});

var client;
var server = new WebSocketServer({ port: port });
server.on('connection', function(socket) {
    console.log('client connected');
    client = socket;
});

module.exports = router;
