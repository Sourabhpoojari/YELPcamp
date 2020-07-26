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
            req.flash('error',err.message);
           return res.redirect('register');
        } 
            passport.authenticate('local')(req,res,()=>{
                req.flash('success',"Welcome to YelpCamp "+ user.username);
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
    req.flash('success','logged you out!');
    res.redirect('/campgrounds');
});



module.exports = router;