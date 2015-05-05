'use strict'

/**
 * Module dependencies.
 */
var _ = require('lodash');
var models = require('../models');
var Category = models.Category;

// 查询分类详情
exports.show = function(req, res, next){
  res.locals.data = req.category;
  next();
}

// 查询分类列表
exports.list = function (req, res, next){
  var page = req.query.page || 1;
  var limit = req.query.limit || 10;
  var sortBy = req.query.sortBy;

  var query = {};
  var options = {
    skip: (page - 1) * limit,
    limit: limit,
    sort: sortBy == 'hot' ? '-playCount' : '-createAt'
  };
  Category.find(query, '', options, function(err, data){
    res.locals.data = data;
    next();
  });
};

// 新建分类
exports.create = function(req, res, next){
  var category = new Category(req.body);
  category.save(function(err){ 
    if(err) next(err);
      res.locals.data = category;
      next();
    });
}

exports.categoryById = function(req, res, next, id){
  Category.findById(id, function(err, data){
    if(err) next(err);
    req.category = data;
    next();
  });
}