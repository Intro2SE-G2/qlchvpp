var express = require('express');
var router = express.Router();

const passport=require('passport');
const loginController=require('../Controller/loginController');

/* GET users listing. */

router.get('/login',loginController.RenderSignIn);


router.post('/login',passport.authenticate("local",{
    successRedirect:"/index",
    failureRedirect:"/users/login",
    successFlash:true,
    failureFlash:true
}));


router.post('/logout',loginController.postSignOut);


module.exports = router;
