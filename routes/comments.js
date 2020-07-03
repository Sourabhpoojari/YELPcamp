const express = require('express'),
    router = express.Router(),
    Campground = require('../models/campground'),
    Comment = require('../models/comment');

router.get('/',(req,res)=>{
    res.render("home");
});

// ######################################
// COMMENTS ROUTES
// ######################################

router.get('/campgrounds/:id/comments/new',isLoggedIn,(req,res)=>{
    Campground.findById(req.params.id,(err,campground)=>{
        if (err) {
            console.log(err);
            
        } else {
            res.render('comments/new',{campground : campground}); 
        }
    });
    
});

router.post('/campgrounds/:id/comments',isLoggedIn,(req,res)=>{
    // lookup campground by id
    Campground.findById(req.params.id,(err,campground)=>{
        if (err) {
            console.log(err);
            res.redirect('/camgrounds');
        } else {
            Comment.create(req.body.comment,(err,comment)=>{
                if (err) {
                    console.log(err);
                } else {
                    //  add username and id
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/'+campground._id);
                }
            });
        }
    });
});

function isLoggedIn(req,res,next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;