'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var userCtrl = require('../controllers/user');
var gameCtrl = require('../controllers/game');
var cateCtrl = require('../controllers/category');
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

// 分类
router.route('/categories')
    .get(cateCtrl.list)
    .post(cateCtrl.create);

router.route('/categories/:categoryId').get(cateCtrl.show);

router.param('categoryId', cateCtrl.categoryById);


// 用户
router.route('/user/signin').post(userCtrl.signin);
router.route('/user/signup').post(userCtrl.signup);


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
        errmsg: err
    });
})

module.exports = router;