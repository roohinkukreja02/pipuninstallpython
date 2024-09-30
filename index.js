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

const flash = require('connect-flash')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const alumniRoutes = require('./routes/alumnidashboard')

const MongoStore = require('connect-mongo');


//sockets
const http = require('http');  // To create the server for Socket.IO
const socketIO = require('socket.io');
const server = http.createServer(app);  // Create an HTTP server
const io = socketIO(server); 
const socketController = require('./controllers/socketController')(io);
const sharedSession = require('express-socket.io-session');

io.use(sharedSession(session({
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
}), {
    autoSave: true  // This option ensures that sessions are automatically saved with every request
}));

/*
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

*/
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
app.use('/dashboard/:id', alumniRoutes);
app.use("/", routes_extras);

app.get('/home', (req,res)=>{
  res.render('home')
})

app.get('/user', (req,res)=>{
  res.render('userP')
})

app.get('/gallery', (req,res)=>{
  res.render('gallery')
})

app.get('/gallery/add', (req,res)=>{
  res.render('gallery')
})

server.listen(port, (req,res)=>{
    console.log(`Server started on port ${port}`);
});
