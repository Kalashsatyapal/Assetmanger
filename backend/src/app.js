const express=require("express");
const cors=require("cors");
const helmet=require("helmet");
const morgan=require("morgan");
const app=express();
app.use(helmet());
app.use(
    cors({
        origin:process.env.CLIENT_URL||"http://localhost:5173",
    })
);
app.use(express.json({limt:"1mb"}));
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));

app.get("/api/health",(req,res)=>{
    res.status(200).json({
        sucsses:true,
        message:"Asset management api is running",
    });
});
module.exports=app;
