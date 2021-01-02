const db_query=require('../DAL/qlchvppDAL');





exports.add=async(supplier)=>
{
    await db_query('INSERT INTO nhacungcap SET MaNhaCungCap=?,TenNhaCungCap=?,SDT=?,Email=?,DiaChi=?',[supplier.MaNhaCungCap,
                       supplier.TenNhaCungCap,
                        supplier.SDT,
                      supplier.Email,
                      supplier.DiaChi],function (err,result)
    {
        if (err) throw err;
        console.log("Insert success");
    });
}



exports.totalRow=async()=>
{
    let total=await getTotal();
    console.log(total);
    return total;
}


exports.detail=async(id)=>
{
    let supplier=await getSupplier(id);
    return supplier;
}

exports.supplerList=async()=>
{

    let list;

    const result=await getListSupplier();
    return result;
}

exports.modify=async(supplier)=>
{
    await db_query('UPDATE nhacungcap SET TenNhaCungCap=?,SDT=?,Email=?,DiaChi=? where MaNhaCungCap=?' ,[
        supplier.TenNhaCungCap,
        supplier.SDT,
        supplier.Email,
        supplier.DiaChi,
        supplier.MaNhaCungCap],function (err,result)
    {
        if (err) throw err;
        console.log("Update success");
    });

}





function getTotal()
{
    return new Promise((resolve, reject) => {
        db_query('SELECT COUNT (*) from nhacungcap',null, (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

function getSupplier(Id)
{

    return new Promise((resolve, reject) => {

        db_query('Select * from nhacungcap where MaNhaCungCap=?',Id, (err, result) => {
            console.log(result);
            return err ? reject(err) : resolve(result);
        });
    });
}

function getListSupplier() {
    return new Promise((resolve, reject) => {
        db_query('SELECT * from nhacungcap', null, (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}
