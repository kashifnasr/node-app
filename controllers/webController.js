import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// controler functions for all pages.
export const homepage=(req,res)=>{
    res.render("home");
}
export const aboutpage=(req,res)=>{
     console.log("temp route called about");
    res.render("about");
}

export const mylogin=(req,res)=>{
    res.render("login");
}


export const showtemp=(req, res) => {
    console.log("app temp");
    res.send("working");

}
export const registration=(req,res)=>{
    res.render("registration",{
        message: req.query.message || ""
    });
}

export const dispdata=(req,res)=>{
    const {name,email}=req.body;
    console.log("data",name,email);
    res.render("success",{ 
        name,
        email
    });
   
};
//---To save data to the user collection in database
export const submitdata=async (req,res)=>{
    const {name,email}=req.body;
    // const name=req.body.name;
    // const email=req.body.email;
    // console.log(name,email);
    try{
        //create a new user record, document in database
        const user=new User({name,email});
        await user.save();
      //  res.render("success",{name,email});
        // res.send("Data saved successfully");
        res.redirect("/registration?message=User added successfully");

    }
    catch(error){
        console.error(error);
        res.send("Error saving data, Maybe email already exist");
    }

}
//--Getting data from data base to display on the page or send to client side. 
export const showdata=async(req,res)=>{
    // const username=req.query.name;
    const users=await User.find();
    // const users=await User.find({name:username});
    console.log("hello this is user",users);
    res.render("showuser",{users});

}

export const deleteuser=async(req,res)=>{
    const userid=req.params.id;
    console.log("userid=",userid);
    await User.findByIdAndDelete(userid);
    res.redirect("/showuser");
    // const users=await User.findByIdAndDelete(userId);
}

export const updateuser=async(req,res)=>{
    const userid=req.params.id;
    await User.findByIdAndUpdate(userid,{name:'Asad khan'});
    res.redirect("/showuser");
}

//----user Registration authentication part--
export const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;
        console.log(name,email,password);
        if (!name || !email || !password) {
            return res.send("All fields required");
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.send("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.redirect("/login");

    } catch (error) {

        console.log(error);
    }
};

export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.send("Invalid Email");
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.send("Invalid Password");
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            "mySecretKey",
            {
                expiresIn: "1d"
            }
        );

        res.cookie("token", token);

        res.redirect("/profile");

    } catch (error) {

        console.log(error);
    }
};

export const profilePage = (req, res) => {

    res.render("profile", {
        user: req.user
    });
};

export const logoutUser = (req, res) => {

    res.clearCookie("token");

    res.redirect("/login");
};
