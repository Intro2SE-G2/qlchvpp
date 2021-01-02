var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render("receipts",{ title: 'Quản lý Nhập kho' });
});
router.get('/id', function(req, res, next) {
    res.render("receiptDetail",{ title: 'Chi tiết Nhập kho' });
});

module.exports = router;
