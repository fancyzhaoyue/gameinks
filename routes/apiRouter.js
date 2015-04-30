'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var gameCtrl = require('../controllers/game');

var router = express.Router();

router.get('/', function(req, res){ res.send('<h1>Gameinks API</h1>'); });

//游戏
router.get('/games', gameCtrl.index);
router.post('/games', gameCtrl.create);


module.exports = router;