var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('bills',{ title: 'Quản lý Bán hàng' });
});
router.get('/billNew', function(req, res, next) {
    res.render('billNew',{ title: 'Tạo hóa đơn' });
});
router.get('/id', function(req, res, next) {
    res.render('billDetail',{ title: 'Chi tiết hóa đơn' });
});
module.exports = router;
