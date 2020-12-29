var express = require('express');
var router = express.Router();

const supplierController=require('../Controller/supplierControler');
/* GET users listing. */

router.get('/', function(req, res, next) {
    res.render("supplierNew",{ title: 'Thêm nhà cung cấp' });
});

router.post('/',supplierController.addNewSupplier);

module.exports = router;




