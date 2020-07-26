const express = require('express'),
    router = express.Router(),
    Campground = require('../models/campground'),
    Comment = require('../models/comment'),
    middleware = require('../middleware/index');

router.get('/',(req,res)=>{
    res.render("home");
});

// ######################################
// COMMENTS ROUTES
// ######################################

router.get('/campgrounds/:id/comments/new',middleware.isLoggedIn,(req,res)=>{
    Campground.findById(req.params.id,(err,campground)=>{
        if (err) {
            console.log(err);
            
        } else {
            res.render('comments/new',{campground : campground}); 
        }
    });
    
});

router.post('/campgrounds/:id/comments',middleware.isLoggedIn,(req,res)=>{
    // lookup campground by id
    Campground.findById(req.params.id,(err,campground)=>{
        if (err) {
            req.flash('error',"Something went wrong!");
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
                    req.flash('success',"Added Comment!!");
                    res.redirect('/campgrounds/'+campground._id);
                }
            });
        }
    });
});

router.get('/campgrounds/:id/comments/:comment_id/edit',middleware.checkCommentsAuth,(req,res)=>{  
    Comment.findById(req.params.comment_id,(err,foundComment)=>{
        if (err) {
            res.redirect('back');
        } else {
            res.render('comments/edit',{comment : foundComment , campground_id:req.params.id});
        }
      });    
});

// edit comment
router.put('/campgrounds/:id/comments/:comment_id',middleware.checkCommentsAuth,(req,res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,updatedComment)=>{
        if (err) {
            res.redirect('back');
        } else {
            req.flash('success',"Comment Edited!!");
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});

// delete comment
router.delete('/campgrounds/:id/comments/:comment_id',middleware.checkCommentsAuth,(req,res)=>{
    Comment.findByIdAndDelete(req.params.comment_id,(err)=>{
        if (err) {
            req.flash('error',"Something went wrong");
            res.redirect('back');
        } else {
            req.flash('success',"Deleted Comment!!");
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});

module.exports = router;