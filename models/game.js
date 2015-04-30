'use strict';

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 var ObjectId = Schema.ObjectId;

 var GameSchema = new Schema({
    name: {type: String },                                             //游戏名称
    playCount: {type: Number, default: 0 },          //人气总数
    summary: {type: String },                                     //摘要
    description: {type: String },                                  //游戏描述
    icon: {type: String },                                                //图标URL
    url: {type: String },                                                   //游戏路径
    categoryId:{type: ObjectId },                              //游戏分类
    createAt: { type: Date, default: Date.now }   //创建时间
 });

 mongoose.model('Game', GameSchema);