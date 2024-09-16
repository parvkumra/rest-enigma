import express from "express";
import dotenv from "dotenv";
dotenv.config({});
const PORT=process.env.PORT || 3009;
const app=express();

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
})


