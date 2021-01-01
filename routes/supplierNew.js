var express = require('express');
var router = express.Router();

const supplierController=require('../Controller/supplierControler');
/* GET users listing. */



router.get('/',supplierController.RenderAddNew);

router.post('/',supplierController.addNewSupplier);



module.exports = router;




