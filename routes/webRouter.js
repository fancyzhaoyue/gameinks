'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var express = require('express');

var router = express.Router();

router.get('/', function(req, res){
    //res.sendfile('app/index.html');
    res.sendFile(path.join(__dirname, '../app/index.html'));
});

module.exports = router;