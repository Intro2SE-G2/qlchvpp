const express = require('express');
const router = express.Router();

const supplierController=require('../Controller/supplierControler');




/* GET users listing. */


router.get('/',supplierController.listSupplier);


router.get('/supplierNew',supplierController.RenderAddNew);
router.post('/supplierNew',supplierController.addNewSupplier);


router.get('/search', supplierController.getSearchSupplier);
router.post('/search', supplierController.postSearchSupplier);

router.get('/sort', supplierController.getSortSupplierName);
router.post('/sort', supplierController.postSortSupplierName);


router.get('/:MaNhaCungCap',supplierController.detail);
router.get('/:MaNhaCungCap/modify',supplierController.modify);
router.post('/:MaNhaCungCap/modify',supplierController.postModify);
router.post('/:MaNhaCungCap/delete',supplierController.postDelete);






module.exports = router;




