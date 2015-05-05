'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CategorySchema = new Schema({
  name       : { type: String },
  description: { type: String },
  icon       : { type: String },
  createAt   : { type: Date, default: Date.now }
});

mongoose.model('Category', CategorySchema);