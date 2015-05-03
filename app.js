'use strict'

/**
 * Module dependencies.
 */
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

require('./models');
var config = require('./config');
var webRouter = require('./routes/webRouter');
var apiRouter = require('./routes/apiRouter');


var app = express();

// 静态文件目录
app.use(express.static(path.join(__dirname, 'app')));

// post等方法body解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next){
	console.log('11111111111');
	next();
})


// 路由配置
app.use('/', webRouter);
app.use('/api', apiRouter);

app.use(function(req, res, next){
	console.log('2222222222222');
})

// 服务器启动
 app.listen(3000, function(){
    console.log('HTTP Server is running at port 3000.');
 });