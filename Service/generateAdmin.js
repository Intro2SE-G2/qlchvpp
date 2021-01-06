const employeeModel=require('../Model/employeeModel');

exports.GenerateAdmin=async()=>
{
    let NhanVien={};
    NhanVien.MaNhanVien='ADMIN';
    NhanVien.TenNhanVien='Quản trị viên';
    NhanVien.MatKhau='admin';
    NhanVien.ChucVu=3;
    NhanVien.SDT='';
    NhanVien.DiaChi='';
    NhanVien.Email='';
    await employeeModel.add(NhanVien);
}