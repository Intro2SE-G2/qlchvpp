var express = require('express');
var router = express.Router();

const profileController=require('../Controller/profileController');

/* GET users listing. */
router.get('/',profileController.RenderProfile);



router.get('/modify',profileController.RenderModify);


router.post('/modify',profileController.postModify);

router.get('/changepassword',profileController.RenderChangePassword);

router.post('/changepassword',profileController.postChangePassword);


module.exports = router;
