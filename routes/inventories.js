var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render("inventories",{ title: 'Quản lý Kiểm kho' });
});
router.get('/inventoryNew', function(req, res) {
    res.render("inventoryNew",{ title: 'Thêm phiếu kiểm kho' });
});
router.get('/id', function(req, res) {
    res.render("inventoryDetail",{ title: 'Thêm phiếu kiểm kho' });
});
module.exports = router;
