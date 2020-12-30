const db=require("../DAL/qlchvppDAL");
const supplierModel=require("../Model/supplierModel");




exports.addNewSupplier=async(req,res,next)=>
{
    const supplier={};
    supplier.MaNhacungCap=req.body.MaNCC;
    supplier.TenNhaCungCap=req.body.TenNCC;
    supplier.SDT=req.body.SDT;
    supplier.Email=req.body.Email;
    supplier.DiaChi=req.body.DiaChi;
    await supplierModel.add(supplier).then(res.redirect('/suppliers'));
}

exports.listSupplier=async(req,res,next)=>
{
    let list=await supplierModel.supplerList();

    res.render('supplierList',{title:"Danh sách nhà cung cấp",Supplier:list});

}

exports.detail=async(req,res,next)=>
{
    const id=req.query.id;
    console.log(id);
    const supplier=await supplierModel.detail(id)
    res.render('supplierDetail',{title:"Chi tiết nhà cung cấp", supplier:supplier
    });
}