
exports.RenderProfile=function(req,res,next)
{
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

    req.render('profileDetail',{title:'Chi tiết tài khoản',user:user});

}

exports.RenderModify=function(req,res,next)
{
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
    req.render('profileModify',{title:'Chỉnh sửa tài khoản',user:user});
}