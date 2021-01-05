const productModel=require('../Model/productModel');


const cloudinary = require("../Controller/cloudinary");



exports.listCustomer=async(req,res,next)=>
{







    let totalRow=await productModel.TotalRow();
    totalRow=parseFloat(totalRow);
    if (req.query.page<1)
    {
        res.redirect('product?page=1');
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

    let list=await productModel.pagination(CurrentPage,ItemPerPage);

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

    req.flash('Page',"");
    req.flash('ItemPerPage',"");

    req.flash('Page',CurrentPage);
    req.flash('ItemPerPage',ItemPerPage);

    console.log("Item per page custom:"+ItemPerPage);

    res.render('products',{title:"Quản lý nhà cung cấp",mathang:list,

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

exports.RenderAdd=async(req,res,next)=>
{

    let displayKey=Date.now();
    const utcSecondsSinceEpoch = Math.round(displayKey / 1000)
    displayKey="MH"+utcSecondsSinceEpoch;
    res.render('productNew',{title:'Thêm mặt hàng mới',displayKey:displayKey});
}


exports.postAdd=async(req,res,next)=>
{
    const product={};
    product.MaMatHang=req.body.MaMatHang;
    product.TenMatHang=req.body.TenMatHang;
    product.DonViTinh=req.body.DonViTinh;
    product.SoLuong=req.body.SoLuong;
    product.XuatXu=req.body.XuatXu;
    product.DonGia=req.body.DonGia;
    product.TinhTrang=req.body.TinhTrang;
    product.Loai=req.body.Loai;

    await productModel.add(product).then(res.redirect('/products'));
}

exports.RenderDetail=async(req,res,next)=>
{
    let id=req.params.MaMatHang;
    const product=await productModel.detail(id);
    console.log(product);
    res.render("productDetail",{title:'Chi tiết mặt hàng',mathang:product});
}

exports.uploadMulter=


exports.postUpload=async(req,res,next)=>
{
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);


    const product={};
    product.MaMatHang=req.body.MaMatHang;
    product.TenMatHang=req.body.TenMatHang;
    product.DonViTinh=req.body.DonViTinh;
    product.SoLuong=req.body.SoLuong;
    product.XuatXu=req.body.XuatXu;
    product.DonGia=req.body.DonGia;
    product.TinhTrang=req.body.TinhTrang;
    product.Loai=req.body.Loai;
    product.HinhAnh=result.secure_url
    // Save user
    await productModel.add(product);

}