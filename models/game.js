'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var GameSchema = new Schema({
  name       : { type: String },
  playCount  : { type: Number, default: 0 },
  summary    : { type: String },
  description: { type: String },
  icon       : { type: String },
  url        : { type: String },
  categoryId : { type: ObjectId },
  createAt   : { type: Date, default: Date.now }
});

mongoose.model('Game', GameSchema);