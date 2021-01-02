

exports.checkSignIn=function (req,res,next)
{
    if (req.isAuthenticated()==false)
    {
        return res.redirect('/users/login');
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