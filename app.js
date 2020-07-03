const express   =     require('express'),
         app    =      express(),
    bodyParser  =    require('body-parser'),
    passport    =   require('passport'),
    localStrategy=  require('passport-local'),
    methodOverride = require('method-override'),
    mongoose    =   require('mongoose');
    mongoose.set('useUnifiedTopology',true);
    mongoose.set('useNewUrlParser',true);
    mongoose.connect('mongodb://localhost/yelp_camp');

// Routes
const campgroundRoutes = require('./routes/campgrounds'),
      commentRoutes    =  require('./routes/comments'),
      authRoutes       = require('./routes/index');


const Campground = require('./models/campground'),
    user        =require('./models/user'),
    seedDB = require('./seeds'),
    Comment = require('./models/comment');
    // seedDB();  //seed the database


app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
app.use(methodOverride('_method'));

// Passport Configuration
app.use(require('express-session')({
    secret:"Damn it's nothing",
    resave : false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
});



// ***************
// Routes
// ***************
app.use(authRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);






app.listen(3000,function(){
    console.log("YELPCAMP SERVER INITIATED!!");  
});