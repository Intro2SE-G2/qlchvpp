

exports.checkSignIn=function (req,res,next)
{
    if (req.isAuthenticated()==false)
    {
        return res.redirect('/login');
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
        return res.redirect('/login');
    }
}

exports.postSignOut=function(req,res)
{
    req.session.destroy(function (err)
    {
        return res.redirect('/login');
    })
}