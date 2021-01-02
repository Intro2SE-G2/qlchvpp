var express = require('express');
var router = express.Router();



const customerController=require('../Controller/customerController');

/* GET users listing. */

router.get('/',customerController.RenderNewCustomer);
router.post('/',customerController.addNewCustomer);

module.exports = router;