var express = require('express');
var router = express.Router();
const upload=require('../Controller/multer');



const productController=require('../Controller/productController');




router.get('/',productController.listCustomer);

router.get('/productNew',productController.RenderAdd);
router.get('/productNew',productController.RenderAdd);





router.get('/:MaMatHang',productController.RenderDetail);

router.post('/productNew/upload',productController.postUpload);


router.post('/productNew',upload.array('image'),productController.postUpload);

module.exports = router;