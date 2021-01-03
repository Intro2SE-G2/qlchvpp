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

    let totalRow=await supplierModel.totalRow();
    console.log(totalRow);
    totalRow=parseFloat(totalRow);
    if (req.query.page<1)
    {
        res.redirect('suppliers?page=1');
    }


    const ItemPerPage=parseFloat(req.query.itemperpage) || 5;
    const CurrentPage=parseFloat(req.query.page) || 1;


    console.log("Item per page "+ItemPerPage);
    console.log("Current page "+CurrentPage);

    const totalPage=Math.ceil(totalRow/ItemPerPage);


    const NextPage=parseFloat(CurrentPage)+1;
    const PreviousPage=parseFloat(CurrentPage-1);

    const NextNextPage=NextPage+1;
    const PreviousPreviousPage=PreviousPage-1;






    console.log(totalPage);

    if (CurrentPage==1)
    {

    }



    let list=await supplierModel.pagination(CurrentPage,ItemPerPage);

    console.log(PreviousPage);
    console.log(NextPage);
    console.log(PreviousPreviousPage);
    console.log(NextNextPage);

    let CanRenderBackBack=false;
    let CanRenderNextNext=false;

    let CanRenderBack=false;
    let CanRenderNext=false;


    if (CurrentPage-2<=0)
    {
        CanRenderBackBack=true;
    }

    if (CurrentPage+2>totalPage)
    {
        CanRenderNextNext=true;
    }
    if (CurrentPage-1<=0)
    {
        CanRenderBack=true;
    }
    if (CurrentPage+1>totalPage)
    {
        CanRenderNext=true
    }



    res.render('suppliers',{title:"Quản lý nhà cung cấp",Supplier:list,

    CurrentPage:CurrentPage,
        NextPage:NextPage,
        PreviousPage:PreviousPage,
        TotalPage:totalPage,
        PreviousPreviousPage:PreviousPreviousPage,
        NextNextPage:NextNextPage,
        CanRenderNext,
        CanRenderBack,
        CanRenderBackBack,
        CanRenderNextNext,
        itemperpage:ItemPerPage

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