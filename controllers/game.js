'use strict'

/**
 * Module dependencies.
 */
var _ = require('lodash');
var models = require('../models');
var Game = models.Game;

// 查询游戏详情
exports.show = function(req, res, next){
  res.locals.data = req.game;
  next();
}

// 查询游戏列表
exports.list = function (req, res, next){
  var page = req.query.page || 1;
  var limit = req.query.limit || 10;
  var sortBy = req.query.sortBy;
  
  var query = { categoryId: req.query.categoryId};
  var options = {
    skip: (page - 1) * limit,
    limit: limit,
    sort: sortBy == 'hot' ? '-playCount' : '-createAt'
  };
  Game.find(query, '', options, function(err, games){
    res.locals.data = games;
    next();
  });
};

// 新建游戏
exports.create = function(req, res, next){
  var game = new Game(req.body);
  game.save(function(err){ 
    if(err) next(err);
      res.locals.data = game;
      next();
    });
}

// 更新游戏
exports.update = function(req, res, next){
  var game = req.game;
  game = _.extend(game, req.body);
  game.save(function(err){ 
    if(err) next(err);
    res.locals.data = game;
    next();
  });
}

// 删除游戏
exports.delete = function(req, res, next){
  var game = req.game;
  game.remove(function(err) {
    if(err) next(err);
    res.locals.data = game;
    next();
  });
}

// 根据游戏ID查询游戏信息
exports.gameById = function(req, res, next, id){
  Game.findById(id, function(err, game){
    if(err) next(err);
    req.game = game;
    next();
  });
}