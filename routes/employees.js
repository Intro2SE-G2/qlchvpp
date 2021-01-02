var express = require('express');
var router = express.Router();

const employeeController=require("../Controller/employeeController");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('employees', { title: 'Quản lý tài khoản' });
});


router.get('/employeeNew',employeeController.RenderAdd);

router.post('/employeeNew',employeeController.postAdd);

module.exports = router;