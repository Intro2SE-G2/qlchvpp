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
    total=total[0].total;
    return parseFloat(total);
}

exports.delete=async(MaNhaCungCap)=>
{
    await db_query('DELETE FROM nhacungcap where MaNhaCungCap=?',MaNhaCungCap,function(err,result)
    {
        if(err)throw err;
        console.log('Delete successful');
    })
}


exports.detail=async(id)=>
{
    let supplier=await getSupplier(id);
    return supplier;
}

exports.pagination=async(Page,ItemPerPage)=>
{
    let Offset=(Page-1)*ItemPerPage;
    let Limit=ItemPerPage;
    let listSupplier=await getListPaginate(Limit,Offset);
    return listSupplier;
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

exports.searchPagination=async(Page,ItemPerPage, key)=>
{
    let Offset=(Page-1)*ItemPerPage;
    let Limit=ItemPerPage;
    let result=await searchSupplier(Limit, Offset, key);
    return result;
}

exports.searchTotalRow=async(key)=>
{
    
    let total=await getTotalRowSearch(key);
    total=total[0].total;
    return parseFloat(total);
}

exports.sortPagination=async(Page,ItemPerPage, key)=>
{
    let Offset=(Page-1)*ItemPerPage;
    let Limit=ItemPerPage;
    let result=await sortSupplierName(Limit, Offset, key);
    return result;
}

exports.sortTotalRow=async(key)=>
{
    let total=await getTotalRowSort(key);
    total=total[0].total;
    return parseFloat(total);
}


function getListPaginate(Limit,Offset)
{
    return new Promise((resolve, reject) => {
        db_query('SELECT * from nhacungcap LIMIT ?,?',[parseInt(Offset),parseInt(Limit)], (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}


function getTotal()
{
    return new Promise((resolve, reject) => {
        db_query('SELECT COUNT (*) as total from nhacungcap',null, (err, result) => {
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

function searchSupplier(Limit, Offset, key){
    key = '%' + key + '%';
    return new Promise((resolve, reject) => {
        db_query('select * from nhacungcap where TenNhaCungCap like ? limit ?, ?', [key, parseInt(Offset),parseInt(Limit)], (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

function getTotalRowSearch(key) {
    key = '%' + key + '%';
    console.log(key);
    return new Promise((resolve, reject) => {
        db_query('select count(*) as total from nhacungcap where TenNhaCungCap like ?', key, (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}



function sortSupplierName(Limit, Offset, key) {
    if (key == "ASC") {
        return new Promise((resolve, reject) => {
            db_query('select * from nhacungcap order by TenNhaCungCap asc limit ?, ?', [parseInt(Offset),parseInt(Limit)], (err, result) => {
                return err ? reject(err) : resolve(result);
            });
        });
    }
    else if (key == "DSC") {
        return new Promise((resolve, reject) => {
            db_query('select * from nhacungcap order by TenNhaCungCap desc limit ?, ?', [parseInt(Offset),parseInt(Limit)], (err, result) => {
                return err ? reject(err) : resolve(result);
            });
        });
    }
    else {
        return new Promise((resolve, reject) => {
            db_query('select * from nhacungcap limit ?, ?', [parseInt(Offset),parseInt(Limit)], (err, result) => {
                return err ? reject(err) : resolve(result);
            });
        });
    }
    
}

function getTotalRowSort(key) {
    if (key == "ASC") {
        return new Promise((resolve, reject) => {
            db_query('select count(*) as total from nhacungcap order by TenNhaCungCap asc', null, (err, result) => {
                return err ? reject(err) : resolve(result);
            });
        });
    }
    else if (key == "DSC") {
        return new Promise((resolve, reject) => {
            db_query('select count(*) as total from nhacungcap order by TenNhaCungCap desc', null, (err, result) => {
                return err ? reject(err) : resolve(result);
            });
        });
    }
    else {
        return new Promise((resolve, reject) => {
            db_query('select count(*) as total from nhacungcap', null, (err, result) => {
                return err ? reject(err) : resolve(result);
            });
        });
    }
    
}