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

exports.TotalRow=async()=>
{
    const total=await getTotal();
    return total[0].total;
}

exports.pagination=async(Page,ItemPerPage)=>
{
    let Offset=(Page-1)*ItemPerPage;
    let Limit=ItemPerPage;
    let listCustomer=await getListPaginate(Limit,Offset);
    return listCustomer;
}

function getListPaginate(Limit,Offset)
{
    return new Promise((resolve, reject) => {
        db_query('SELECT * from khachhang LIMIT ?,?',[parseInt(Offset),parseInt(Limit)], (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}


function getTotal() {
    return new Promise((resolve, reject) => {
        db_query('SELECT COUNT (*) as total from khachhang',null, (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
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

exports.delete=async(MaKhachHang)=>
{
    await db_query('DELETE from khachhang where MaKhachHang=?',MaKhachHang,function(err,result)
    {
        if (err)throw err;
        console.log('Delete successful');
    })
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

