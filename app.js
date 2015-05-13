'use strict'

/**
 * Module dependencies.
 */
var path = require('path');
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

// app.use(session({
//   secret: 'gameinks_secret',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { maxAge: 60 * 1000 }
// }));
app.use(function(req, res, next){
  console.log(req.url);
  next();
})

// app.use('/', function (req, res) {
//   if(req.session.isVisit) {
//     req.session.isVisit++;
//     res.send('<p>第 ' + req.session.isVisit + '次来此页面</p>');
//   } else {
//     req.session.isVisit = 1;
//     res.send("欢迎第一次来这里");
//     console.log(req.session);
//   }
// });

// 路由配置
app.use('/api', apiRouter);
app.use('/*', webRouter);

// 服务器启动
app.listen(3000, function(){
  console.log('HTTP Server is running at port 3000.');
});