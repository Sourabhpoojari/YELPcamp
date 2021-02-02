const express = require('express'),
    router    = express.Router(),
    Campground= require('../models/campground'),
    middleware = require('../middleware/index');
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

router.post('/campgrounds',middleware.isLoggedIn,(req,res)=>{
    let name =req.body.name,
     image =req.body.image,
     price = req.body.price,
     desc = req.body.description;
    const author = {
        id: req.user._id,
        username : req.user.username
     }
    const newCampground = {
        name : name,
        price : price,
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

router.get('/campgrounds/new',middleware.isLoggedIn,(req,res)=>{
    res.render('campgrounds/new');
});

// SHOW - show more details of campgrounds
router.get('/campgrounds/:id',(req,res)=>{
    // find the campground with provided id
    Campground.findById(req.params.id).populate('comments').exec((err,foundCampground)=>{
        if (err) {
            console.log(err);      
        } else {
            console.log(foundCampground);
            
            // render the show template with that campground
            res.render('campgrounds/show',{campground : foundCampground });
        }
    });
});

// EDIT CAMPGROUNDS ROUTE
router.get('/campgrounds/:id/edit',middleware.checkCampgroundsAuth,(req,res)=>{ 
    Campground.findById(req.params.id,(err,foundCampground)=>{      
            res.render('campgrounds/edit',{campground : foundCampground});
    });
});
// UPDATE CAMPGROUNDS ROUTE
router.put('/campgrounds/:id',middleware.checkCampgroundsAuth,(req,res)=>{
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
router.delete('/campgrounds/:id',middleware.checkCampgroundsAuth,(req,res)=>{
    Campground.findByIdAndDelete(req.params.id,(err)=>{
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

module.exports = router;