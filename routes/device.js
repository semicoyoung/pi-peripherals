var nconf = require('nconf');
var path = require('path');
var express = require('express');
var router = express.Router();
var configFile = path.resolve(__dirname, '../config.json');

nconf.argv()
     .env()
     .file({ file: configFile });

router.get('/config', function(req, res, next) {
    var deviceId = nconf.get('device').deviceId;
    res.render('deviceconfig', { deviceId: deviceId });
});

router.post('/config', function(req, res, next) {
    nconf.set('device:deviceId', req.body.value);
    nconf.save(function(err) {
        if (err) {
            throw err;
        }
    });

    res.end(JSON.stringify({ success: true }));
})

module.exports = router;
