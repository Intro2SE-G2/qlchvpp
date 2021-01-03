const db_query=require('../DAL/qlchvppDAL');
const bcrypt=require('bcrypt');


exports.modify=async(User)=>
{
    await db_query('UPDATE nhanvien SET TenNhanVien=?,SDT=?,Email=?,GioiTinh=? where MaNhanVien=?',[
        User.TenNhanVien,
        User.SDT,
        User.Email,
        User.GioiTinh,
        User.MaNhanVien],function(err,result){
            if(err) throw err;
            console.log('Update successful');

        })
}

exports.UpdatePassword=async(Password,MaNhanVien)=>
{

    let salt=bcrypt.genSaltSync(10);
    let hashPassword=bcrypt.hashSync(Password,salt);

    await db_query('UPDATE nhanvien SET MatKhau=? where MaNhanVien=?',[hashPassword,MaNhanVien],function(err,result)
    {
        if (err)throw err;
        console.log('Update successful');
    })
}


