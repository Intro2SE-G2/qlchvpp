

exports.checkSignIn=function (req,res,next)
{
    if(req.isAuthenticated()==false && req.url != '/users/login') {

        req.flash('error','Bạn cần đăng nhập trước')
        res.redirect('/users/login');

        return;
    }
    next();
}

exports.checkSignOut=function (req,res,next)
{
    if (req.isAuthenticated()==true)
    {
        next();
    }
    else
    {
        return res.redirect('/users/login');
    }
}

exports.postSignOut=function(req,res)
{
    req.session.destroy(function (err)
    {
        return res.redirect('/users/login');
    })
}

exports.RenderSignIn=function(req,res)
{
    return res.render('logIn',{layout:false,title:'Đăng nhập',error:req.flash('error')});
}