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

require('./user');
require('./game');
require('./category');

exports.User = mongoose.model('User');
exports.Game = mongoose.model('Game');
exports.Category = mongoose.model('Category');