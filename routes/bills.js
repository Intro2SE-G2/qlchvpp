var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('bills',{ title: 'Quản lý Bán hàng' });
});

module.exports = router;
