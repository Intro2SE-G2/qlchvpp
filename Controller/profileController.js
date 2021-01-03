
const profileModel=require('../Model/profileModel');


exports.RenderProfile=function(req,res,next)
{
    const user=req.user;

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

    res.render('profileDetail',{title:'Chi tiết tài khoản',user:user});

}

exports.RenderModify=function(req,res,next)
{
    const user=req.user;

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
    res.render('profileModify',{title:'Chỉnh sửa tài khoản',user:user});
}


exports.postModify=async(req,res)=>
{
    let user={};
    user.MaNhanVien=req.body.MaNhanVien;
    user.TenNhanVien=req.body.TenNhanVien;
    user.GioiTinh=req.body.GioiTinh;
    user.Email=req.body.Email;
    user.SDT=req.body.SDT;
    await profileModel.modify(user).then(res.redirect('/profile'));


}

exports.RenderChangePassword=function(req,res)
{
    res.render('changePassword',{title:'Thay đổi mật khẩu'});
}

exports.postChangePassword=async(req,res)=>
{
    const NewPassword=req.body.MatKhauMoi;

    await profileModel.UpdatePassword(NewPassword,req.user.MaNhanVien).then(res.redirect(301,'/profile/modify'));
}