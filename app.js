'use strict'

/**
 * Module dependencies.
 */
var path = require('path');
var logger = require('morgan');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');



require('./models');
var config = require('./config');
var webRouter = require('./routes/webRouter');
var apiRouter = require('./routes/apiRouter');


var app = express();

// 静态文件目录
app.use(express.static(path.join(__dirname, 'app')));

// body解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: 'gameinks_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 24 * 1000 }
}));

// 路由配置
app.use('/api', apiRouter);
app.use('/*', webRouter);

// 服务器启动
app.listen(3000, function(){
  console.log('HTTP Server is running at port 3000.');
});
