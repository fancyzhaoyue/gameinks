'use strict'

/**
 * Module dependencies.
 */
var config = require('./config');
var path = require('path');
var express = require('express');
var webRouter = require('./routes/webRouter');
var apiRouter = require('./routes/apiRouter');

 var app = express();
 app.locals.title = 'My App';

// 静态文件目录
app.use(express.static(path.join(__dirname, 'app')));

// 路由配置
app.use('/', webRouter);
app.use('/api', apiRouter);

// 服务器启动
 app.listen(8080, function(){
    console.log('HTTP Server is running at port 8080.');
 });