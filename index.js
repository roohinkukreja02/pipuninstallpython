if(process.env.NODE_ENV != 'production')
  {
      require('dotenv').config();
  }

const express=require("express");
const mongoose=require("mongoose");
const port=6006;
const app=express();
const path = require('path')
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session=require("express-session");
const flash = require('connect-flash')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const alumniRoutes = require('./routes/alumnidashboard')


//parsing body and using in functions
app.use(express.json());
//allows parsing of more objects, more than key value pairs
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);

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

app.use(flash());


app.use((req, res, next) =>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.welcome = req.flash('welcome');
    next();
})

// ROUTES
app.use('/dashboard/:id', alumniRoutes);


app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});
