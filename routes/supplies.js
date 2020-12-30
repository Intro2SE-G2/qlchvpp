var express = require('express');
var router = express.Router();






/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render("suppliers",{ title: 'Quản lý Nhà cung cấp' });
});



module.exports = router;




