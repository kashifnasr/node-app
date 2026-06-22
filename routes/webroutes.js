import express from "express";
import {profilePage,registerUser,loginUser,logoutUser, mylogin,homepage,aboutpage,registration,submitdata, showtemp, showdata, deleteuser,updateuser} from "../controllers/webController.js"
import authMiddleware from "../middleware/authMiddleware.js";
const router=express.Router();

// router.get("/",(req,res)=>{
//     res.render("home");
// });

router.get("/",homepage);
router.get("/about",aboutpage);
router.get("/registration",registration);
router.get("/login",mylogin);
//---middle ware------
router.get("/profile", authMiddleware, profilePage);


// router.post("/registration",submitdata);


router.get("/temp",showtemp)
router.get("/showuser",showdata);
router.get("/search-user",showdata);
router.post("/delete-user/:id",deleteuser);
router.post("/update-user/:id",updateuser);
//====user registration and login---
router.post("/registration", registerUser);
router.post("/login", loginUser);

router.get("/logout", logoutUser);

//-------------
export default router;
