var Check = require('../models/check');
var net = require('net');
var fs = require('fs');
var WebSocketServer = require('ws').Server;
var express = require('express');
var router = express.Router();
var port = 3001;

var check = new Check();
/*
check.items.push({ name: 'Firecracker Shrimp', value: 5.99 });
check.items.push({ name: 'Seabreeze Sunrise', value: 10.05 });
check.taxes.push({ name: 'Sales Tax', value: 2.99 });
check.taxes.push({ name: 'Event Tax', value: 3.99 });
check.subtotal = 15.99;
check.total = 22.97;
*/

// GET
router.get('/', function(req, res, _) {
    res.render('display', { check: check });
});

// POST
router.post('/', function(req, res, _) {
    console.log(JSON.stringify(req.body));
    check = req.body;
    client.send('refresh');
    res.writeHead(202, { 'Content-Type': 'plain/text' });
    res.end();
});

var client;
var server = new WebSocketServer({ port: port });
server.on('connection', function(socket) {
    console.log('client connected');
    client = socket;
    //socket.send(JSON.stringify(check));
});


// Sockets!
//var server = net.createServer(function(socket) {
//    console.log('client connected!');
//    socket.on('end', function() {
//        console.log('client disconnected');
//    });
//
//    socket.write(JSON.stringify(check));
//});
//
//server.on('error', function(err) {
//    console.error(err);
//});
//
//server.listen(port, function() {
//    console.log('customer display server listening on port: ' + port);
//});

module.exports = router;
