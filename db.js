
// DATABASE CONNECTION
mongoose.connect("mongodb+srv://hellokashif_db_user:42EHJJWHoySlH8df@cluster0.ieb8ehe.mongodb.net/")
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.log("Database connection error:", error);
    });
