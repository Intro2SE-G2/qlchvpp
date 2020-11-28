var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('employees', { title: 'Quản lý tài khoản' });
});

module.exports = router;