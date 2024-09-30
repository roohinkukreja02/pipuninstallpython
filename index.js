const express=require("express");
const mongoose=require("mongoose");
const port=6006;
const app=express();
const session=require("express-session");
const routes_auth=require("./routes/routes-auth");
const routes_extras=require("./routes/routes-extras");
//parsing body and using in functions
app.use(express.json());
//allows parsing of more objects, more than key value pairs
app.use(express.urlencoded({extended: true}));

//for public folder
app.use(express.static('public'));
//for ejs files
app.set("view engine", "ejs");


//mongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/codeissance")
.then(console.log("MongoDB connected"))
.catch((err)=>{console.log(err)});


app.use(session({
    secret: 'your_secret_key', // Replace with a strong secret key    
    resave: false,
    saveUninitialized: true,
   

    cookie: {
      maxAge: 3600000,  // 1 hour
      httpOnly: true,   // Secure cookie
      secure: false     // Use true in production with HTTPS
  }
  }));





app.use("/", routes_auth);

app.use("/", routes_extras);

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});
