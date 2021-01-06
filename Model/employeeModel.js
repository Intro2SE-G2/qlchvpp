const db_query=require('../DAL/qlchvppDAL');
const bcrypt=require('bcrypt');

exports.add=async(NhanVien)=>
{

    let salt=bcrypt.genSaltSync(10);
    let HashMatKhau=bcrypt.hashSync(NhanVien.MatKhau,salt);

    await db_query('INSERT INTO nhanvien SET MaNhanVien=?,TenNhanVien=?,SDT=?,Email=?,ChucVu=?,GioiTinh=?,MatKhau=?,DiaChi=?',[
        NhanVien.MaNhanVien,
        NhanVien.TenNhanVien,
        NhanVien.SDT,
        NhanVien.Email,
        NhanVien.ChucVu,
        NhanVien.GioiTinh,
        HashMatKhau,
        NhanVien.DiaChi

    ],function (err,result)
    {
        if (err) throw err;
        console.log("Create NhanVien successful");
    });
}

exports.CheckID=function(ID){
}


function getDetail(id) {
    return new Promise((resolve, reject) => {
        db_query('SELECT * from nhanvien where MaNhanVien=?', id, (err, result) => {

            if (error)
            {
                reject(err);
            }
            if (result.length>0)
            {
                resolve(true);
            }
            else
            {
                resolve(false);
            }

        });
    });
}
