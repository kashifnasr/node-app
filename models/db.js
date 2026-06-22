import mongoose from "mongoose";
const conndb=()=>{mongoose.connect("mongodb://localhost:27017/studentDB" )
.then(() => {
        console.log("Database connected successfully again");
    })
    .catch((error) => {
        console.log("Database connection error:", error);
    });
}

export default conndb;