exports.Logger=(req,res,next)=>{
    console.log(`Time:${new Date().toLocaleString}\nURL:${req.url}\nMethod:${req.method}`);
    next();
}