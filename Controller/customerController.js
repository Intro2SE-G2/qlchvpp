
const customerModel=require('../Model/customerModel');

exports.addNewCustomer=async(req,res,next)=>
{
    const Customer={};
    Customer.MaKhachHang=req.body.MaKhachHang;
    Customer.TenKhachHang=req.body.TenKhachHang;
    Customer.SDT=req.body.SDT;
    Customer.DiaChi=req.body.DiaChi;
    Customer.Email=req.body.Email;
    Customer.GioiTinh=req.body.GioiTinh;

    await customerModel.add(Customer).then(res.redirect('/customers'));
}

exports.RenderNewCustomer=function(req,res,next)
{
    let displayKey=Date.now();
    const utcSecondsSinceEpoch = Math.round(displayKey / 1000)
    displayKey="KH"+utcSecondsSinceEpoch;
    res.render('customerNew',{title:'Thêm khách hàng mới',displayKey:displayKey});
}


exports.listCustomer=async(req,res,next)=>
{
    const listCusomter=await customerModel.list()
    res.render('customers',{title:'Danh sách khách hàng',khachhang:listCusomter});
}

exports.detail=async(req,res,next)=>
{
    const id=req.params.MaKhachHang;
    const customer=await customerModel.detail(id);
    res.render('customerDetail',{title:'Chi tiết khách hàng',khachhang:customer});
}

exports.RenderModify=async(req,res,next)=>
{
    const id=req.params.MaKhachHang;
    const customer=await customerModel.detail(id);

    res.render('customerModify',{title:'Chỉnh sửa khách hàng',khachhang:customer});
}