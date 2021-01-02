var express = require('express');
var router = express.Router();

const loginController=require('../Controller/loginController')

/* GET home page. */
router.get('/', loginController.checkSignIn,function(req, res, next) {


  res.render('index', { title: 'Trang chủ' });
});

module.exports = router;
