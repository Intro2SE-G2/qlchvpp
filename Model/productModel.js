const db_query=require('../DAL/qlchvppDAL');


exports.add=async(product)=>
{
    await db_query('INSERT INTO mathang SET MaMatHang=?,TenMatHang=?,LoaiMatHang=?,DonGia=?,DonViTinh=?,HinhAnh=?,TinhTrang=?,XuatXu=?,Loai=?,SoLuong=?',[
     product.MaMatHang,product.TenMatHang,product.Loai,product.DonGia,product.DonViTinh,product.HinhAnh,product.TinhTrang,product.XuatXu,product.Loai,product.SoLuong

    ],function(err,result)
        {
            if (err) throw err;
            console.log('Insert succesful');
        }
    )
}


exports.pagination=async(Page,ItemPerPage)=>
{
    let Offset=(Page-1)*ItemPerPage;
    let Limit=ItemPerPage;
    let listProduct=await getListPaginate(Limit,Offset);
    return listProduct;
}

exports.detail=async(id)=>
{
    let product=await getDetail(id);
    return product;
}

function getDetail(id)
{
    return new Promise((resolve, reject) => {
        db_query('SELECT * from mathang where MaMatHang=?',id, (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

function getListPaginate(Limit,Offset)
{
    return new Promise((resolve, reject) => {
        db_query('SELECT * from mathang LIMIT ?,?',[parseInt(Offset),parseInt(Limit)], (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}


exports.TotalRow=async()=>
{
    let total=await getTotal();
    total=total[0].total;
    return parseFloat(total);
}
function getTotal()
{
    return new Promise((resolve, reject) => {
        db_query('SELECT COUNT (*) as total from mathang',null, (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

