var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render("supplierDetail",{ title: 'Xem sửa nhà cung cấp' });
});

module.exports = router;




