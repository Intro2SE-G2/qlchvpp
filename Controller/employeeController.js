const employeeModel=require('../Model/employeeModel')
const bcrypt=require('bcrypt');


function makeid(length) {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}



exports.RenderAdd = function (req,res,next) {

    let displayKey;

    do {
        displayKey="NV"+makeid(8);
    }while(employeeModel.CheckID(displayKey)==true)

    res.render('employeeNew',{title:'Thêm nhân viên mới',displayKey:displayKey});
}

exports.postAdd=async(req,res,next)=>
{
    let NhanVien={};
    NhanVien.MaNhanVien=req.body.MaNhanVien;
    NhanVien.TenNhanVien=req.body.TenNhanVien;
    NhanVien.MatKhau=req.body.MatKhau;
    NhanVien.GioiTinh=req.body.GioiTinh;
    NhanVien.ChucVu=req.body.ChucVu;
    NhanVien.Email=req.body.Email;
    NhanVien.SDT=req.body.SDT;

    await employeeModel.add(NhanVien).then(res.redirect('/employees'));
}
