var express = require('express');
var router = express.Router();

const customerController=require('../Controller/customerController');

/* GET users listing. */


router.get('/',customerController.listCustomer);
router.get('/:MaKhachHang',customerController.detail);
router.get('/:MaKhachHang/modify',customerController.RenderModify);


module.exports = router;
