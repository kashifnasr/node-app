
import express from "express"
import webroutes from "./routes/webroutes.js"
import mongoose from "mongoose";
import conndb from "./models/db.js"
import cookieParser from "cookie-parser";
//for path midleware


// Create a server
const app= express();
const PORT=3000;

//database Connectivity---------
 conndb();
// // DATABASE CONNECTION
// mongoose.connect("mongodb://127.0.0.1:2017/studentDB")
//     .then(() => {
//         console.log("Database connected successfully");
//     })
//     .catch((error) => {
//         console.log("Database connection error:", error);
//     });
// //-------------------------


// To sent rendering engine
app.set("view engine","ejs");

//for CSS and Images 
app.use(express.static("public"));

//To parse form data we need this middleware. 
app.use(express.urlencoded({extended:true}))

app.use(cookieParser());

// Defining endpoints. rendiring pages redirecting request to routes files


app.use("/", webroutes)
// app.get("/",(req,res)=>{
//     res.render("home");
// })

// app.get("/about",(req,res)=>{
//     res.render("about");
// })





//listening server
app.listen(PORT,()=>{
    console.log(`Server is runing on ${PORT}`)
})