var express = require('express');
var router = express.Router();

const supplierController=require("../Controller/supplierControler");


router.get('/',supplierController.detail);

router.get('/?id=:MaNhaCungCap',supplierController.detail);
module.exports = router;




