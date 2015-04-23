var express = require('express');

var router = express.Router();
router.use(function(req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});
router.get('/', function(req, res){
    res.sendfile('app/index.html');
});
module.exports = router;