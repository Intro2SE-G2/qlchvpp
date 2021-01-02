var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('products',{ title: 'Quản lý Hàng hóa' })
});
router.get('/id', function(req, res, next) {
    res.render('productDetail',{ title: 'Chi tiết Hàng hóa' })
});
router.get('/productNew', function(req, res, next) {
    res.render('productNew',{ title: 'Thêm Hàng hóa' })
});

module.exports = router;