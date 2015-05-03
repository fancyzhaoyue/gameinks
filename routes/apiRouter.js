'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var gameCtrl = require('../controllers/game');

var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(req, res){ res.send('<h1>Gameinks API</h1>'); });

// 游戏
router.route('/games')
	.get(gameCtrl.list)
	.post(gameCtrl.create);

router.route('/games/:gameId')
	.get(gameCtrl.show)
	.put(gameCtrl.update)
	.delete(gameCtrl.delete);

router.param('gameId', gameCtrl.gameById);

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

module.exports = router;