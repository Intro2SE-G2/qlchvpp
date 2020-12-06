var express = require('express');
var router = express.Router();


/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.render("supplierList",{ title: 'Danh sách nhà cung cấp' });
// });

router.get('/', function(req, res, next) {
    res.render("supplierList",{ title: 'Danh sách nhà cung cấp' });
});
module.exports = router;




