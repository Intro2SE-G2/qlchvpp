var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render("inventories",{ title: 'Quản lý Kiểm kho' });
});

module.exports = router;
