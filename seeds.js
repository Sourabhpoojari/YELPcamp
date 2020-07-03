const mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment');

const data = [
    {
        name :'Manali',
        image :"https://toib.b-cdn.net/wp-content/uploads/2017/08/solang-valley-manali.jpg",
        description : 'This is a beautiful nature visit camping ground with no bathrooms, no water, Beautiful Manali!.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a erat et erat porta ullamcorper lacinia eget quam. Suspendisse maximus nec orci vel aliquet. Nulla dictum elementum erat, a ullamcorper mi congue sed. Nunc eros justo, tincidunt dignissim laoreet pulvinar, vulputate in lorem. Fusce fringilla egestas dapibus. Nunc vitae quam non felis tincidunt tristique at vel nibh. Duis id nunc lectus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec metus risus, vestibulum ut nulla a, fermentum dignissim lectus. Sed at sem nisi. Nullam interdum risus at finibus finibus.'
    },
    {
        name :'Spiti Valley',
        image :"https://toib.b-cdn.net/wp-content/uploads/2017/08/spiti-valley-himachal-pradesh.jpg",
        description : 'A adorable valley with a splitii view!! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a erat et erat porta ullamcorper lacinia eget quam. Suspendisse maximus nec orci vel aliquet. Nulla dictum elementum erat, a ullamcorper mi congue sed. Nunc eros justo, tincidunt dignissim laoreet pulvinar, vulputate in lorem. Fusce fringilla egestas dapibus. Nunc vitae quam non felis tincidunt tristique at vel nibh. Duis id nunc lectus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec metus risus, vestibulum ut nulla a, fermentum dignissim lectus. Sed at sem nisi. Nullam interdum risus at finibus finibus.'
    },
    {
        name :'Rishikesh',
        image :"https://toib.b-cdn.net/wp-content/uploads/2017/08/rishikesh-uttarakhand.jpg",
        description : 'A beautiful place with the holy blessing of lor Shiva! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a erat et erat porta ullamcorper lacinia eget quam. Suspendisse maximus nec orci vel aliquet. Nulla dictum elementum erat, a ullamcorper mi congue sed. Nunc eros justo, tincidunt dignissim laoreet pulvinar, vulputate in lorem. Fusce fringilla egestas dapibus. Nunc vitae quam non felis tincidunt tristique at vel nibh. Duis id nunc lectus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec metus risus, vestibulum ut nulla a, fermentum dignissim lectus. Sed at sem nisi. Nullam interdum risus at finibus finibus.'
    },
    {
        name :'Anjuna beach – Goa',
        image :"https://toib.b-cdn.net/wp-content/uploads/2017/08/anjuna-beach-goa.jpg",
        description : 'It is the most attracted place for tourist people from outside coountry!! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a erat et erat porta ullamcorper lacinia eget quam. Suspendisse maximus nec orci vel aliquet. Nulla dictum elementum erat, a ullamcorper mi congue sed. Nunc eros justo, tincidunt dignissim laoreet pulvinar, vulputate in lorem. Fusce fringilla egestas dapibus. Nunc vitae quam non felis tincidunt tristique at vel nibh. Duis id nunc lectus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec metus risus, vestibulum ut nulla a, fermentum dignissim lectus. Sed at sem nisi. Nullam interdum risus at finibus finibus.'
    }
]

function seedDB(){
    // Remove all campgrounds
    Campground.deleteMany({},(err)=>{
        if (err) {
            console.log(err);
            
        } else {
            console.log('Campgrounds are removed!');
          // add few campgrounds
    //         data.forEach((seed)=>{
    //             Campground.create(seed,(err,campground)=>{
    //                 if (err) {
    //                     console.log(err);
                        
    //                 } else {
    //                     console.log('Added Campgrounds!');
    //                     // Remove all coments
    //                     Comment.deleteMany({},(err)=>{
    //                         if (err) {
    //                             console.log(err);
                                
    //                         } else {
    //                             console.log('All comments deleted!!');
    //                             Comment.create({
    //                                 text : 'This place is awesome!!!, but i wish there was proper network connection!',
    //                                 author : 'Bhaskar'
    //                             },(err,comment)=>{
    //                                 if (err) {
    //                                     console.log(err);
                                        
    //                                 } else {
    //                                     campground.comments.push(comment);
    //                                     campground.save();
    //                                     console.log('added a comment');
                                        
    //                                 }
    //                             });
    //                         }
    //                     });
    //                     // add few comments
                      
    //                 }
    //             });
    // })
    
            
        }
    });

}

module.exports = seedDB;