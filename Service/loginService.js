
const db_query=require('../DAL/qlchvppDAL');
const bcrypt=require('bcrypt');

let findMaNhanVien=(MaNhanVien)=>
{
    return new Promise(((resolve,reject)=>
    {
        try
        {
            db_query("SELECT * from nhanvien where MaNhanVien=?",MaNhanVien,function(error,rows)
            {
                if (error)
                {
                    reject(error);
                }
                let NhanVien=rows[0];
                resolve(NhanVien);
            })
        }catch (e)
        {
            reject(e)
        }
    }))
};

let comparePasswordUser=(NhanVien,MatKhau)=>
{
    return new Promise((async (resolve,reject)=>
    {
        try
        {
            let isMatch=await bcrypt.compare(MatKhau,NhanVien.MatKhau);
            if (isMatch) resolve(true);
            reject("Sai thông tin đăng nhập");
        }catch (e)
        {
            reject(e)
        }
    }))
};

module.exports=
    {
      findMaNhanVien:findMaNhanVien,
      comparePasswordUser:comparePasswordUser
    };