if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const seedDb = require('./seed');
const productRoutes = require('./routes/product')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const session = require('express-session');
const flash  = require('connect-flash');

const passport = require('passport');
const Localstrategy = require('passport-local');
const User = require('./modals/user');
const authRoutes = require('./routes/auth')

const cartRoutes = require('./routes/cart');


const sessionConfig = {
    secret: 'weneedsomebetttersecret',
    resave: false,
    saveUninitialized: true
}


app.use(session(sessionConfig));
app.use(flash());
// Initilize the passport. and seession for storing the user infoo`
app.use(passport.initialize());
app.use(passport.session());

// Configure the passport to use local strategy.
passport.use(new Localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error =req.flash('error');
    res.locals.currentUser = req.user;
    next();
})

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false})
.then(()=>
{
    console.log("Db connected");
})
.catch((err)=>{
    console.log(err);
});


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/views'))
//seedDb()

app.use(productRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.get('/', (req,res)=>{
    res.send("Hello world");
})



app.listen(process.env.PORT ||3000, ()=>{
    console.log("Server started at port 3000");
});
