'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
	email      : { type: String },
	password   : { type: String },
	accessToken: { type: String }
});

mongoose.model('User', UserSchema);