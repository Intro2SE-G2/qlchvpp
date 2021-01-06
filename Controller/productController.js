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
    console.log("List size: "+list.length);

    for (let i=0;i<list.length;i++)
    {
        let firstLine = list[i].HinhAnh.split('\n', 1)[0];
        list[i].HinhAnh=firstLine;
    }

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

    const linkHinhAnh=product[0].HinhAnh.split('\n');

    linkHinhAnh.pop();

    console.log(linkHinhAnh);


    console.log(product);
    res.render("productDetail",{title:'Chi tiết mặt hàng',mathang:product,HinhAnh:linkHinhAnh});
}

exports.uploadMulter=


exports.postUpload=async(req,res,next)=>
{
    const product={};
    product.HinhAnh="";


    let paths = req.files.map(file => file.path);
    let product_id=req.body.MaMatHang+"/";
    let multipleUpload = new Promise(async (resolve, reject) => {
        let upload_len = paths.length;
        for(let i = 0; i < upload_len; i++)
        {

            let filePath = paths[i];
            await cloudinary.uploader.upload(filePath,{folder:product_id},(error, result) => {



                if(result)
                {
                    product.HinhAnh=result.secure_url+"\n"+product.HinhAnh;

                } else if(error) {
                    console.log(error)
                    reject(error)
                }
            })

        }
        resolve('Complete')
    })
        .then((result) => result)
        .catch((error) => error)

    await multipleUpload.then(function() {

            const fs = require('fs');
            let i=0;
            for (i=0;i<paths.length;i++)
            {
                fs.unlink(paths[i], (err) => {
                    if (err) {
                        console.error(err)
                    }
                })
            }

        }

    );


    product.MaMatHang=req.body.MaMatHang;
    product.TenMatHang=req.body.TenMatHang;
    product.DonViTinh=req.body.DonViTinh;
    product.SoLuong=req.body.SoLuong;
    product.XuatXu=req.body.XuatXu;
    product.DonGia=req.body.DonGia;
    product.TinhTrang=req.body.TinhTrang;
    product.Loai=req.body.Loai;
    // Save user
    await productModel.add(product).then(res.redirect('/products'));

}

