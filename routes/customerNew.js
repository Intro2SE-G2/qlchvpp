var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render("customerNew",{ title: 'Thêm khách hàng mới' });
});

module.exports = router;