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
const routes_auth=require("./routes/routes-auth");
const routes_extras=require("./routes/routes-extras");

const routes_student_dash=require("./routes/routes_student_dash");

const Alumni = require('./models/models_alumni')

const flash = require('connect-flash')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const alumniRoutes = require('./routes/alumnidashboard')
const studentRoutes = require('./routes/studentdashboard')
const forumRoutes = require('./routes/forums')
const userRoutes = require('./routes/user')

const sturoutes=require("./routes/routes_student_dash");

const MongoStore = require('connect-mongo');
const { applyJob } = require('./controllers/controllers_student');




app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/sessionstore'
    }),
    cookie: {
        maxAge: 3600000,  // 1 hour
        httpOnly: true,
        secure: false
    }
}));


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




app.use(flash());


app.use((req, res, next) =>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.welcome = req.flash('welcome');
    next();
})



app.use("/", routes_auth);
// ROUTES
app.use('/alumnidashboard/:id', alumniRoutes);
app.use('/studentdashboard/:id', studentRoutes);
app.use('/', routes_extras);
//app.use("/", routes_student_dash);

app.use("/studentdashboard/:id", sturoutes);

app.get('/home', async(req,res)=>{
  const alumni = await Alumni.find({});
  res.render('home', {alumni})
})

app.get('/user', (req,res)=>{
  res.render('userP')
})

app.get('/forums', (req,res)=>{
  res.render('forum')
})

app.get('/gallery', (req,res)=>{
  res.render('gallery')
})

app.get('/gallery/add', (req,res)=>{
  res.render('gallery')
})

app.listen(port, (req,res)=>{
    console.log(`Server started on port ${port}`);
});
