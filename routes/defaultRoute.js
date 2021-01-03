var express = require('express');
var router = express.Router();


const loginController=require('../Controller/loginController');

/* GET users listing. */

/*
router.get('/',loginController.checkSignIn,function(req,res,next
)
{
    res.redirect('homepage');
});
*/


module.exports = router;
