const db=require("../DAL/qlchvppDAL");
const supplierModel=require("../Model/supplierModel");


exports.totalRow=async()=> {
    const total = await supplierModel.totalRow()

}

exports.RenderAddNew=async (req,res,next) =>{

    let displayKey= await Date.now();
    const utcSecondsSinceEpoch = Math.round(displayKey / 1000)
    displayKey="NCC"+utcSecondsSinceEpoch;



    let CurrentPage=req.flash('Page');
    let ItemPerPage=req.flash('ItemPerPage');

    req.flash('Page',CurrentPage);
    req.flash('ItemPerPage',ItemPerPage);
    const backUrl="/suppliers?page="+CurrentPage+"&itemperpage="+ItemPerPage;



    res.render('supplierNew',{title:'Thêm mới nhà cung cấp',displayKey:displayKey,CurrentPage:CurrentPage,ItemPerPage:ItemPerPage
    ,backUrl:backUrl});
}

exports.addNewSupplier=async(req,res,next)=>
{
    let page=req.flash('Page');
    let itemperpage=req.flash('ItemPerPage');

    console.log("Thêm mới hiển thị page",page);


    const backUrl="/suppliers?page="+page+"&itemperpage"+itemperpage;
    const supplier={};
    supplier.MaNhaCungCap=req.body.MaNCC;
    supplier.TenNhaCungCap=req.body.TenNCC;
    supplier.SDT=req.body.SDT;
    supplier.Email=req.body.Email;
    supplier.DiaChi=req.body.DiaChi;
    await supplierModel.add(supplier).then(res.redirect(backUrl));
}

exports.listSupplier=async(req,res,next)=>
{

    let totalRow=await supplierModel.totalRow();
    console.log(totalRow);
    totalRow=parseFloat(totalRow);
    if (req.query.page<1)
    {
        res.redirect('/suppliers?page=1');
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


    req.flash('Page',"");
    req.flash('ItemPerPage',"");

    req.flash('Page',CurrentPage);
    req.flash('ItemPerPage',ItemPerPage);

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



    let CurrentPage=req.flash('Page');
    let ItemPerPage=req.flash('ItemPerPage');

    req.flash(('Page'),CurrentPage);
    req.flash('ItemPerPage',ItemPerPage);

    let backUrl="/suppliers?page="+CurrentPage+"&itemperpage="+ItemPerPage;
    const supplier=await supplierModel.detail(id)
    res.render('supplierDetail',{title:"Chi tiết nhà cung cấp", Supplier:supplier,backUrl:backUrl});
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
    await supplierModel.modify(supplier).then(res.redirect(backUrl));
}

exports.postDelete=async(req,res,next)=>
{
    const MaNhaCungCap=req.params.MaNhaCungCap;
    await supplierModel.delete(MaNhaCungCap).then(res.redirect('suppliers'));
}

var keyWordSearch;

exports.postSearchSupplier=async(req, res, next)=>
{
    keyWordSearch = await req.body.TenNCC;
    console.log(keyWordSearch);
    //const supplier = await supplierModel.search(keyWord);

    let totalRow = await supplierModel.searchTotalRow(keyWordSearch);
    console.log('search Total Row');
    

    totalRow=parseFloat(totalRow);  
    console.log(totalRow);
    if (req.query.page<1)
    {
        res.redirect('/suppliers/search?page=1');
    }


    

    const ItemPerPage=parseFloat(req.query.itemperpage) || 5;
    const CurrentPage=parseFloat(req.query.page) || 1;


    console.log("Item per page "+ItemPerPage);
    console.log("Current page "+CurrentPage);

    const totalPage=Math.ceil(totalRow/ItemPerPage);
    console.log("Total Page Search"+totalPage);

    const NextPage=parseFloat(CurrentPage)+1;
    const PreviousPage=parseFloat(CurrentPage-1);

    const NextNextPage=NextPage+1;
    const PreviousPreviousPage=PreviousPage-1;






    

    if (CurrentPage==1)
    {

    }



    let listSearch = await supplierModel.searchPagination(CurrentPage,ItemPerPage, keyWordSearch);

    console.log("Previous Page Search"+PreviousPage);
    console.log("Next Page Search"+NextPage);
    console.log("Previous Previous Page Search"+PreviousPreviousPage);
    console.log("Next Next Page Search"+NextNextPage);

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

    res.render('supplierSearch',{title:"Tìm kiếm",Supplier:listSearch,

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
    //res.render('suppliers',{title:"Tìm kiếm",Supplier:supplier});
}


exports.getSearchSupplier=async(req, res, next)=>
{
    let totalRow = await supplierModel.searchTotalRow(keyWordSearch);
    console.log('search Total Row');
    

    totalRow=parseFloat(totalRow);  
    console.log(totalRow);
    if (req.query.page<1)
    {
        res.redirect('/suppliers/search?page=1');
    }


    

    const ItemPerPage=parseFloat(req.query.itemperpage) || 5;
    const CurrentPage=parseFloat(req.query.page) || 1;


    console.log("Item per page "+ItemPerPage);
    console.log("Current page "+CurrentPage);

    const totalPage=Math.ceil(totalRow/ItemPerPage);
    console.log("Total Page Search"+totalPage);

    const NextPage=parseFloat(CurrentPage)+1;
    const PreviousPage=parseFloat(CurrentPage-1);

    const NextNextPage=NextPage+1;
    const PreviousPreviousPage=PreviousPage-1;






    

    if (CurrentPage==1)
    {

    }



    let listSearch = await supplierModel.searchPagination(CurrentPage,ItemPerPage, keyWordSearch);

    console.log("Previous Page Search"+PreviousPage);
    console.log("Next Page Search"+NextPage);
    console.log("Previous Previous Page Search"+PreviousPreviousPage);
    console.log("Next Next Page Search"+NextNextPage);

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

    res.render('supplierSearch',{title:"Tìm kiếm",Supplier:listSearch,

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

var keyWordSort;

exports.postSortSupplierName=async(req, res, next)=>
{
    keyWordSort = await req.body.sortForm1;
    console.log(keyWordSort);
    //const supplier = await supplierModel.search(keyWord);

    let totalRow = await supplierModel.sortTotalRow(keyWordSort);
    
    

    totalRow=parseFloat(totalRow);  
    console.log(totalRow);
    if (req.query.page<1)
    {
        res.redirect('/suppliers/sort?page=1');
    }


    

    const ItemPerPage=parseFloat(req.query.itemperpage) || 5;
    const CurrentPage=parseFloat(req.query.page) || 1;


    console.log("Item per page "+ItemPerPage);
    console.log("Current page "+CurrentPage);

    const totalPage=Math.ceil(totalRow/ItemPerPage);
    console.log("Total Page Search"+totalPage);

    const NextPage=parseFloat(CurrentPage)+1;
    const PreviousPage=parseFloat(CurrentPage-1);

    const NextNextPage=NextPage+1;
    const PreviousPreviousPage=PreviousPage-1;






    

    if (CurrentPage==1)
    {

    }



    let listSort = await supplierModel.sortPagination(CurrentPage,ItemPerPage, keyWordSort);

    console.log("Previous Page Search"+PreviousPage);
    console.log("Next Page Search"+NextPage);
    console.log("Previous Previous Page Search"+PreviousPreviousPage);
    console.log("Next Next Page Search"+NextNextPage);

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

    res.render('supplierSort',{title:"Sắp xếp",Supplier:listSort,

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
    //res.render('suppliers',{title:"Tìm kiếm",Supplier:supplier});
}


exports.getSortSupplierName=async(req, res, next)=>
{
    let totalRow = await supplierModel.sortTotalRow(keyWordSort);
    

    totalRow=parseFloat(totalRow);  
    console.log(totalRow);
    if (req.query.page<1)
    {
        res.redirect('/suppliers/sort?page=1');
    }


    

    const ItemPerPage=parseFloat(req.query.itemperpage) || 5;
    const CurrentPage=parseFloat(req.query.page) || 1;


    console.log("Item per page "+ItemPerPage);
    console.log("Current page "+CurrentPage);

    const totalPage=Math.ceil(totalRow/ItemPerPage);
    console.log("Total Page Search"+totalPage);

    const NextPage=parseFloat(CurrentPage)+1;
    const PreviousPage=parseFloat(CurrentPage-1);

    const NextNextPage=NextPage+1;
    const PreviousPreviousPage=PreviousPage-1;






    

    if (CurrentPage==1)
    {

    }



    let listSort = await supplierModel.sortPagination(CurrentPage,ItemPerPage, keyWordSort);

    console.log("Previous Page Search"+PreviousPage);
    console.log("Next Page Search"+NextPage);
    console.log("Previous Previous Page Search"+PreviousPreviousPage);
    console.log("Next Next Page Search"+NextNextPage);

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

    res.render('supplierSort',{title:"Sắp xếp",Supplier:listSort,

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
    //res.render('suppliers',{title:"Tìm kiếm",Supplier:supplier});
}