var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {


  const user=req.user;
  if (user.ChucVu=3)
  {
    user.ChucVu='Quản trị viên'
  }
  switch(user.ChucVu)
  {
    case 1:
      user.ChucVu='Nhân viên bán hàng'
          break;
    case 2:
      user.ChucVu='Nhân viên kho'
          break;
    case 3:
      user.ChucVu='Quản trị viên'
  }

  res.render("profileDetail",{ title: 'Tài khoản cá nhân',user:user });
});

router.get('/modify',function(req,res,next)
{
  const user=req.user;
  res.render('profileModify',{title:'Chỉnh sửa tài khoản',user:user});


})

module.exports = router;
