'use strict'

/**
 * Module dependencies.
 */
var models = require('../models');
var Game = models.Game;

exports.index = function (req, res, next){
    var query = req.query;
    Game.find(query, function(games){
        res.json(games);
    });
};
exports.create = function(req, res, next){
    var game = new Game();
    game.name = '弹射羊驼';
    game.playCount = 1000;
    game.summary = '弹射羊驼一飞冲天';
    game.description = '弹射羊驼一飞冲天弹射羊驼一飞冲天';
    game.icon = 'http://img5.douban.com/lpic/o636459.jpg';
    game.url = 'http://www.douban.com/online/11614662/';
    game.save(function(){ 
        res.send({data: game});
    });
}