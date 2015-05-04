'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var gameCtrl = require('../controllers/game');

var router = express.Router();

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

// 正常返回
router.use(function(req, res, next) {
    res.send({
        retcode: 200,
        data: res.locals.data
    });
});

// 错误处理
router.use(function(err, req, res, next){
    console.error('server 500 error:', err);
    res.send({
        retcode: 500,
        errmsg: '服务器错误'
    });
})

module.exports = router;