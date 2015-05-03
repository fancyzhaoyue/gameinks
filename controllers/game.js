'use strict'

/**
 * Module dependencies.
 */
var _ = require('lodash');
var models = require('../models');
var Game = models.Game;


exports.create = function(req, res, next){

    var game = new Game(req.body);
    game.save(function(){ 
        res.send({data: game});
    });
}

exports.show = function(req, res, next){
    res.json(req.game);
}

exports.list = function (req, res, next){

    var query = req.query || {};
    Game.find(query, function(err, games){
        res.json(games);
    });
    next();
};

exports.update = function(req, res, next){

    var game = req.game;
    game = _.extend(game, req.body);
    game.save(function(){ 
        res.send({data: game});
    });
    
}

exports.delete = function(req, res, next){
    
    var game = new Game(req.body);
    game.save(function(){ 
        res.send({data: game});
    });
    
}

exports.gameById = function(req, res, next, id){
    Game.findById(id, function(err, game){
        req.game = game;
        next();
    });
}