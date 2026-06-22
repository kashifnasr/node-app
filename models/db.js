import mongoose from "mongoose";
const conndb=()=>{mongoose.connect("mongodb+srv://hellokashif_db_user:42EHJJWHoySlH8df@cluster0.ieb8ehe.mongodb.net/" )
.then(() => {
        console.log("Database connected successfully again");
    })
    .catch((error) => {
        console.log("Database connection error:", error);
    });
}

export default conndb;