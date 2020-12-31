var express = require('express');
var router = express.Router();

const supplierController=require("../Controller/supplierControler");

router.get('/:MaNhaCungCap/modify',supplierController.modify);


router.get('/:MaNhaCungCap',supplierController.detail);



router.post('/:MaNhaCungCap/modify',supplierController.postModify);


module.exports = router;




