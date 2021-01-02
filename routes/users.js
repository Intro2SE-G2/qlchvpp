var express = require('express');
var router = express.Router();

const passport=require('passport');
const loginController=require('../Controller/loginController');

/* GET users listing. */
router.get('/login', function(req, res, next) {

    res.render('login',{layout: false, title: 'Đăng nhập',error:req.flash('error') });
});



router.post('/login',passport.authenticate("local",{
    successRedirect:"/index",
    failureRedirect:"/login",
    successFlash:true,
    failureFlash:true
}));


router.post('/logout',loginController.postSignOut);


module.exports = router;
