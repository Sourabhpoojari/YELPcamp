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

router.get('/campgrounds/:id/comments/:comment_id/edit',checkCommentsAuth,(req,res)=>{  
    Comment.findById(req.params.comment_id,(err,foundComment)=>{
        if (err) {
            res.redirect('back');
        } else {
            res.render('comments/edit',{comment : foundComment , campground_id:req.params.id});
        }
      });    
});

// edit comment
router.put('/campgrounds/:id/comments/:comment_id',checkCommentsAuth,(req,res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,updatedComment)=>{
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});

// delete comment
router.delete('/campgrounds/:id/comments/:comment_id',checkCommentsAuth,(req,res)=>{
    Comment.findByIdAndDelete(req.params.comment_id,(err)=>{
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});
function isLoggedIn(req,res,next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkCommentsAuth(req,res,next){
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id,(err,foundComment)=>{
            if (err) {
                res.redirect('back');
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
}
module.exports = router;