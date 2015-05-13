'use strict'

/**
 * Module dependencies.
 */
var _ = require('lodash');
var models = require('../models');
var User = models.User;

/**
 * 用户登录
 */
exports.signin = function(req, res, next){
  var loginName = req.body.loginName;
  var password = req.body.password;
  
  // 根据登录名(邮箱),查询用户,并验密
  User.findOne({email: loginName}, function(err, user){
    if(err){
      next(err);
    }else{
      if(!user){
        next('用户不存在');
      }else{
        if(password != user.password){
          next('密码不正确');
        }else{
          res.locals.data = user;
          next();
        }
      }
    }
  });
}

/**
 * 用户注册
 */
exports.signup = function(req, res, next){
  // 初始化user
  var user = new User(req.body);

  // 注册信息校验

  // 邮箱是否已占用

  // 保存用户信息
  user.save(function(err){
    if(err) next(err);
    res.locals.data = user;
    next();
  });

}