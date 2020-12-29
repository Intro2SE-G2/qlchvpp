const {db}=require("../DAL/qlchvppDAL");
const supplierModel=require("../Model/supplierModel");

exports.addNewSupplier=async(req,res,next)=>
{
    let supplier;
    supplier.MaNCC=req.body.MaNCC;
    supplier.TenNCC=req.body.TenNCC;
    supplier.SDT=req.body.SDT;
    supplier.Email=req.body.Email;
    supplier.DiaChi=req.body.DiaChi;
    await supplierModel.add(supplier);
}