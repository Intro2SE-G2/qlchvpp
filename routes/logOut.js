var express = require('express');
var router = express.Router();

const loginController=require('../Controller/loginController');



router.post('/',loginController.postSignOut);

module.exports = router;
