'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db.url, config.db.options, function(err){
    if(err){
        console.error('connect to %s error: ', config.db.url, err.message);
        process.exit(1);
    }
});

require('./game');

exports.Game = mongoose.model('Game');