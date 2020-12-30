const db_query=require('../DAL/qlchvppDAL');





exports.add=async(supplier)=>
{
    db_query('INSERT INTO nhacungcap SET MaNhaCungCap=?,TenNhaCungCap=?,SDT=?,Email=?,DiaChi=?',[supplier.MaNhacungCap,
                       supplier.TenNhaCungCap,
                        supplier.SDT,
                      supplier.Email,
                      supplier.DiaChi],function (err,result)
    {
        if (err) throw err;
        console.log("Insert success");
    });
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

function getSupplier(Id)
{
    return new Promise((resolve, reject) => {
        db_query('SELECT * from nhacungcap where MaNhaCungCap=?',[Id], (err, result) => {
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
