const express = require('express'),
    router    = express.Router(),
    Campground= require('../models/campground');
// Campgrounds Route
router.get('/campgrounds',(req,res)=>{
    // Get all campgorunds from DB
    Campground.find({},(err,allcampgrounds)=>{
        if (err) {
            console.log(err);
            
        } else {
            res.render('campgrounds/index', {campgrounds : allcampgrounds});
        }
    });

    
});





router.post('/campgrounds',isLoggedIn,(req,res)=>{
    var name =req.body.name;
    var image =req.body.image;
    var desc = req.body.description;
    const author = {
        id: req.user._id,
        username : req.user.username
    }
    const newCampground = {
        name : name,
        image : image,
        description : desc,
        author : author
    }
    // campgrounds.push();
    //create a new campground and save to db
    Campground.create(newCampground,(err,camp)=>{
            if (err) {
                console.log(err);      
            } else {
                // redirect to campgrounds page
                res.redirect('/campgrounds');
            }
        });
});

router.get('/campgrounds/new',isLoggedIn,(req,res)=>{
    res.render('campgrounds/new');
});

// SHOW - show more details of campgrounds
router.get('/campgrounds/:id',(req,res)=>{
    // find the campground with provided id
    Campground.findById(req.params.id).populate('comments').exec((err,foundCampground)=>{
        if (err) {
            console.log(err);      
        } else {
            // console.log(foundCampground);
            
            // render the show template with that campground
            res.render('campgrounds/show',{campground : foundCampground });
        }
    });
});

// EDIT CAMPGROUNDS ROUTE
router.get('/campgrounds/:id/edit',isLoggedIn,(req,res)=>{
    Campground.findById(req.params.id,(err,foundCampground)=>{
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/edit',{campground : foundCampground});
        }
    });
   
});
// UPDATE CAMPGROUNDS ROUTE
router.put('/campgrounds/:id',isLoggedIn,(req,res)=>{
    const data = req.body.campground;
    Campground.findByIdAndUpdate(req.params.id,data,(err,updatedCampground)=>{
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});

// Destroy campground route
router.delete('/campgrounds/:id',isLoggedIn,(req,res)=>{
    Campground.findByIdAndDelete(req.params.id,(err)=>{
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
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