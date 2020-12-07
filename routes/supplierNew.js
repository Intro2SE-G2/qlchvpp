var express = require('express');
var router = express.Router();


/* GET users listing. */

router.get('/', function(req, res, next) {
    res.render("supplierNew",{ title: 'Thêm nhà cung cấp' });
});

module.exports = router;




