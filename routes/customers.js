var express = require('express');
var router = express.Router();

const customerController=require('../Controller/customerController');

/* GET users listing. */


router.get('/',customerController.listCustomer);
router.get('/customerNew',customerController.RenderNewCustomer);
router.post('/customerNew',customerController.addNewCustomer);
router.get('/:MaKhachHang',customerController.detail);
router.get('/:MaKhachHang/modify',customerController.RenderModify);
router.post('/:MaKhachHang/modify',customerController.postModify);


module.exports = router;
