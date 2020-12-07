var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.render("inventoryNew",{ title: 'Thêm phiếu kiểm kho' });
});

module.exports = router;
