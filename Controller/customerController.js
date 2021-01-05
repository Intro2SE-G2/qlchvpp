
const customerModel=require('../Model/customerModel');

exports.addNewCustomer=async(req,res,next)=>
{

    let Page=req.flash('Page');
    let ItemPerPage=req.flash('ItemPerPage');
    const backUrl='/customers?page='+Page+"&itemperpage="+ItemPerPage;

    const Customer={};
    Customer.MaKhachHang=req.body.MaKhachHang;
    Customer.TenKhachHang=req.body.TenKhachHang;
    Customer.SDT=req.body.SDT;
    Customer.DiaChi=req.body.DiaChi;
    Customer.Email=req.body.Email;
    Customer.GioiTinh=req.body.GioiTinh;

    await customerModel.add(Customer).then(res.redirect(backUrl));
}

exports.RenderNewCustomer=function(req,res,next)
{
    let Page=req.flash('Page');
    let ItemPerPage=req.flash('ItemPerPage');

    req.flash('Page',Page);
    req.flash('ItemPerPage',ItemPerPage);


    const backUrl='/customers?page='+Page+"&itemperpage="+ItemPerPage;


    let displayKey=Date.now();
    const utcSecondsSinceEpoch = Math.round(displayKey / 1000)
    displayKey="KH"+utcSecondsSinceEpoch;
    res.render('customerNew',{title:'Thêm khách hàng mới',displayKey:displayKey,backUrl:backUrl});
}


exports.listCustomer=async(req,res,next)=>
{







    let totalRow=await customerModel.TotalRow();
    totalRow=parseFloat(totalRow);
    if (req.query.page<1)
    {
        res.redirect('customers?page=1');
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

    let list=await customerModel.pagination(CurrentPage,ItemPerPage);

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

    res.render('customers',{title:"Quản lý nhà cung cấp",khachhang:list,

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
    const id=req.params.MaKhachHang;

    let Page=req.flash('Page');
    let ItemPerPage=req.flash('ItemPerPage');

    req.flash('Page',Page);
    req.flash('ItemPerPage',ItemPerPage);

    let backUrl="/customers?page="+Page+"&itemperpage="+ItemPerPage;

    console.log('Back url:'+backUrl);

    const customer=await customerModel.detail(id);
    res.render('customerDetail',{title:'Chi tiết khách hàng',khachhang:customer,backUrl:backUrl});
}

exports.RenderModify=async(req,res,next)=>
{
    const id=req.params.MaKhachHang;
    const customer=await customerModel.detail(id);



    res.render('customerModify',{title:'Chỉnh sửa khách hàng',khachhang:customer});
}

exports.postModify=async(req,res,next)=>
{
    const customer={};
    customer.MaKhachHang=req.body.MaKhachHang;
    customer.TenKhachHang=req.body.TenKhachHang;
    customer.SDT=req.body.SDT;
    customer.Email=req.body.Email;
    customer.DiaChi=req.body.DiaChi;
    customer.GioiTinh=req.body.GioiTinh;

    const backUrl="/customers/"+customer.MaKhachHang;
    await customerModel.modify(customer).then(res.redirect(301,backUrl));

}

exports.postDelete=async(req,res,next)=>
{
    let MaKhachHang=req.params.MaKhachHang;
    await customerModel.delete(MaKhachHang).then(res.redirect(301,'/customers'));
}