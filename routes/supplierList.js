var express = require('express');
var router = express.Router();

const supplierController=require("../Controller/supplierControler");


/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.render("supplierList",{ title: 'Danh sách nhà cung cấp' });
// });

/*
router.get('/', function(req, res, next) {

    let list;
    list=supplierController.listSupplier();

    res.render("supplierList",{ title: 'Danh sách nhà cung cấp',Supplier:list });
});

 */

router.get('/',supplierController.listSupplier);

router.get('/supplierDetail/?id=:MaNhaCungCap',supplierController.detail);
module.exports = router;




