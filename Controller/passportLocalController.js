
const passport=require('passport');
const passportLocal=require('passport-local');
const loginService=require('../Service/loginService');


let LocalStrategy=passportLocal.Strategy;

let initPassportLocal=()=>
{
    passport.use(new LocalStrategy(
        {
            usernameField:'MaNhanVien',
            passwordField:'MatKhau',
            passReqToCallback:true
        },
        async (req,MaNhanVien,MatKhau,done)=>
        { try
        {
            let user=await loginService.findMaNhanVien(MaNhanVien);
            if(!user)
            {
                return done(null,false,{message:'Nhân viên không tồn tại'});
            }
            if (user)
            {
                let match =await loginService.comparePasswordUser(user,MatKhau);
                if (match==true)
                {
                    return done(null,user,null);
                }
                else
                {
                    return done(null,false,{message:'Mật khẩu hoặc tên đăng nhập sai'})
                }
            }

        }catch (e)
        {
            return done(null,false,{message:"Có lỗi xảy ra"});
        }

        }
    ))

    passport.serializeUser((NhanVien,done)=>
    {
        done(null,NhanVien.MaNhanVien);
    })

    passport.deserializeUser((MaNhanVien,done)=>
    {
        loginService.findMaNhanVien(MaNhanVien).then((NhanVien)=>
        {
            return done(null,NhanVien);
        }).catch(error=>
        {
            return done(error,null)
        });
    });
}



module.exports=initPassportLocal;