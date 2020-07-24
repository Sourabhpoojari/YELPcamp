const Campground = require('../models/campground'),
Comment = require('../models/comment');
const  isLoggedIn = (req,res,next)=>{
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

const  checkCommentsAuth = (req,res,next)=>{
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

const  checkCampgroundsAuth = (req,res,next)=>{
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id,(err,foundCampground)=>{
            if (err) {
                res.redirect('back');
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
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

exports.isLoggedIn = isLoggedIn;
exports.checkCommentsAuth = checkCommentsAuth;
exports.checkCampgroundsAuth = checkCampgroundsAuth;