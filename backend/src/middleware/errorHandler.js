function errorHandler(err,req,res,next){
    if(res.headersSent){
        return next(err);
}
const statusCode=err.statusCode||500;
if(statusCode>= 500){
    console.error(err);
}
res.status(statusCode).json({
    success:false,
    message:
    statusCode >=500
    ? "Internal servor error":
    err.message||"request failed",
});
}
module.exports=errorHandler;