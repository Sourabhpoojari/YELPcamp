const express = require('express'),
        router = express.Router(),
        passport= require('passport'),
        user = require('../models/user');

// ************
// Auth routes
//  **********

// show register form
router.get('/register',(req,res)=>{
    res.render('register');
});

// handle sign-up
router.post('/register',(req,res)=>{
    // res.send('signed in');
    let newUser = new user({username : req.body.username});
    user.register(newUser,req.body.password,(err,user)=>{
        if (err) {
            console.log(err);
           return res.render('register');
        } 
            passport.authenticate('local')(req,res,()=>{
                res.redirect('/campgrounds');
            });       
    });
    
});

//  show login form
router.get('/login',(req,res)=>{
    res.render('login');
});

// handle login 
router.post('/login',passport.authenticate('local',
    {   
        successRedirect: '/campgrounds',
        failureRedirect : '/login'
    }),
    (req,res)=>{
});

// logout route
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/campgrounds');
});

function isLoggedIn(req,res,next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;