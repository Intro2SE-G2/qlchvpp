const db=require("../DAL/qlchvppDAL");
const supplierModel=require("../Model/supplierModel");


exports.totalRow=async()=> {
    const total = await supplierModel.totalRow()

}

exports.RenderAddNew=async (req,res,next) =>{

    let displayKey= await Date.now();
    const utcSecondsSinceEpoch = Math.round(displayKey / 1000)
    displayKey="NCC"+utcSecondsSinceEpoch;
    res.render('supplierNew',{title:'Thêm mới nhà cung cấp',displayKey:displayKey});
}

exports.addNewSupplier=async(req,res,next)=>
{
    const supplier={};
    supplier.MaNhaCungCap=req.body.MaNCC;
    supplier.TenNhaCungCap=req.body.TenNCC;
    supplier.SDT=req.body.SDT;
    supplier.Email=req.body.Email;
    supplier.DiaChi=req.body.DiaChi;
    await supplierModel.add(supplier).then(res.redirect('/suppliers'));
}

exports.listSupplier=async(req,res,next)=>
{

    const totalRow=await supplierModel.totalRow();
    if (req.query.page<1)
    {
        res.redirect('suppliers?page=1');
    }

    const CurrentPage=req.query.page || 1;
    const NextPage=CurrentPage+1;
    const PreviousPage=CurrentPage-1;

    const totalPage=Math.ceil(totalRow/)

    const ItemPerPage=req.query.itemperpage || 2;

    if (CurrentPage==1)
    {

    }



    let list=await supplierModel.pagination(CurrentPage,ItemPerPage);

    res.render('suppliers',{title:"Quản lý nhà cung cấp",Supplier:list,

    CurrentPage:CurrentPage,
        NextPage:NextPage,
        PreviousPage:PreviousPage
    });

}

exports.detail=async(req,res,next)=>
{
    const id=req.params.MaNhaCungCap;
    console.log(id);
    const supplier=await supplierModel.detail(id)
    res.render('supplierDetail',{title:"Chi tiết nhà cung cấp", Supplier:supplier});
}
exports.modify=async(req,res,next)=>
{
    const id=req.params.MaNhaCungCap;
    const supplier=await supplierModel.detail(id);
    res.render('supplierModify',{title:"Chỉnh sửa",Supplier:supplier});
}
exports.postModify=async(req,res,next)=>
{
    const supplier={};
    supplier.MaNhaCungCap=req.body.MaNCC;
    supplier.TenNhaCungCap=req.body.TenNCC;
    supplier.DiaChi=req.body.DiaChi;
    supplier.SDT=req.body.SDT;
    supplier.Email=req.body.Email;

    console.log(supplier.MaNhaCungCap);

    const backUrl='/suppliers/'+supplier.MaNhaCungCap;
    await supplierModel.modify(supplier).then(res.redirect(301,backUrl));
}

exports.postDelete=async(req,res,next)=>
{
    const MaNhaCungCap=req.params.MaNhaCungCap;
    await supplierModel.delete(MaNhaCungCap).then(res.redirect(301,'suppliers'));
}