var express = require('express');
var router = express.Router();

const passport=require('passport');
const initPassportLocal=require('../Controller/passportLocalController');
initPassportLocal();

/* GET users listing. */
router.get('/', function(req, res, next) {

    res.render('login',{layout: false, title: 'Đăng nhập',error:req.flash('error') });
});



router.post('/',passport.authenticate("local",{
    successRedirect:"/homepage",
    failureRedirect:"/login",
    successFlash:true,
    failureFlash:true
}));



module.exports = router;
