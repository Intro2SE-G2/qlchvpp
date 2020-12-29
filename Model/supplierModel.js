const {db}=require('../DAL/qlchvppDAL');
exports.add=async(supplier)=>
{
    var values=[supplier.MaNCC,supplier.TenNCC,supplier.SDT,supplier.Email,supplier.DiaChi];
    var sqlinsert="Insert into nhacungcap values ?";
    db.query(sqlinsert, [values], function (err, result) {
        if (err) throw err;
        console.log("Insert successful");
    });
}