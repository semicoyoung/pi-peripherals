var http = require('http');
var url = require('url');
var express = require('express');
var router = express.Router();

var post_url;
var deviceId = '068cc0e2-8b5c-41d8-96a7-fcee613fc9f2';

router.get('/', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ post_url: post_url }));
});

router.post('/register', function(req, res) {
    post_url = url.parse(req.body.post_url);
    console.log('registering device: ' + req.body.deviceId);
    console.log('post_url: ' + JSON.stringify(post_url));

    res.writeHead(202, { 'Content-Type': 'plain/text' });
    res.end();
});

process.stdin.on('data', function(text) {
    if (post_url) {
        var postData = JSON.stringify({
            deviceId: deviceId,
            data: text.toString()
        });

        var options = {
            hostname: post_url.hostname,
            port: post_url.port,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': postData.length
            }
        };

        var req = http.request(options);
        req.on('error', function(err) {
            console.log(err);
        });

        console.log('posting received data: ' + postData);
        req.end(postData);
        return;
    }

    console.warn('register a callback url');
});

module.exports = router;
