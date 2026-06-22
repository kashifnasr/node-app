
// DATABASE CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.log("Database connection error:", error);
    });
