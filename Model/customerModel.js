const db_query=require('../DAL/qlchvppDAL');

exports.add=async(Customer)=>
{
    await db_query('Insert into khachhang SET MaKhachHang=?,TenKhachHang=?,DiaChi=?,SDT=?,Email=?,GioiTinh=?',
        [Customer.MaKhachHang,Customer.TenKhachHang,Customer.DiaChi,Customer.SDT,Customer.Email,Customer.GioiTinh],function(err,result)
    {
        if (err) throw err;
        console.log("Insert successful");
    });
}

exports.list=async()=>
{
    let list
    const result=await getListCustomer();
    return result;
}

exports.detail=async(id)=>
{
    let customer;
    customer=await getDetail(id);
    return customer;
}



exports.modify=async(customer)=> {
    await db_query('UPDATE khachhang SET TenKhachHang=?,SDT=?,Email=?,DiaChi=?,GioiTinh=? where MaKhachHang=?', [
        customer.TenKhachHang,
        customer.SDT,
        customer.Email,
        customer.DiaChi,
        customer.GioiTinh,
        customer.MaKhachHang], function (err, result) {
        if (err) throw err;
        console.log("Update success");
    });
}


    function getDetail(id) {
        return new Promise((resolve, reject) => {
            db_query('SELECT * from khachhang where MaKhachHang=?', id, (err, result) => {
                return err ? reject(err) : resolve(result);
            });
        });
    }


    function getListCustomer() {
        return new Promise((resolve, reject) => {
            db_query('SELECT * from khachhang', null, (err, result) => {
                return err ? reject(err) : resolve(result);
            });
        });
    }

