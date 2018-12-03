"use strict";
var express = require('express');
var router = express.Router({mergeParams:true});
let mongoose = require('mongoose');

let User  = require('../models/user.js')
let Location = require('../models/location.js')
let Donation = require('../models/donation.js')

let fs = require('fs')
let csv = require('csvtojson')
let path = require('path')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.post('/register', function(req, res, next) {
  let email = req.body.email.toLowerCase();
  let password = req.body.password.toLowerCase();
  let usertype = req.body.usertypepicker;
  let user = new User({
    email,
    password,
    usertype
  });
  console.log('hello')
  User.find({email:email}, function(err, res2) {
    if(res2.length>0) {
      console.log(err);
      res.render('index', {title: 'You have already registered! Thank you! Please log in!'})
    } else {
      user.save(function(err, res3) {
        if (err) return console.error(err);
        console.log(res3)
        res.render('index', {title: 'Thank you so much for Registering!'});
      })
    }
  })
});

router.get('/home', function(req,res,next) {
  Location.find()
  .exec(function(err, locations) {
    res.render('userScreen', {locations})
  })
})

router.get('/home/:id', function(req,res,next) {
  // let adventure = {}
  // let donations = []
  Location.findById(req.params.id)
  .exec(function(err, adventure) {
    Donation.find({location:req.params.id})
    .exec(function(err, donations) {
      res.render('locationScreen', {adventure, donations})
    })
  })
})

router.post('/home/:id', function(req,res,next) {
  let location = req.params.id;
  let short_description = req.body.short_description
  let full_description = req.body.full_description
  let value = req.body.value
  let category = req.body.categorypicker;
  let comments = [req.body.comments]
  let picture = req.body.picture;
  let donation = new Donation({
    location,
    short_description,
    full_description,
    value,
    category,
    comments,
    picture,
  })
  console.log(donation)
  donation.save(function(err, res2) {
    res.redirect(`/home/${req.params.id}`)
  })

  // Location.findById(req.params.id)
  // .exec(function(err, adventure) {
  //   console.log(adventure)
  //   res.render('locationScreen', {adventure})
  // })
})

router.post('/', function(req, res, next) {
  let email = req.body.email.toLowerCase();
  let password = req.body.password.toLowerCase();
  let usertype = req.body.usertypepicker;
  let user = new User({
    email,
    password,
    usertype
  });
  console.log(user)
  User.findOne({email:email}, function(err, res2) {
    if(res2 === null) {
      console.log(err);
      res.render('index', {title: 'Could not find user. Please register'})
    } else {
      // conso
      if (res2.password === password) {
        res.redirect('/home')
      } else {
        res.render('index', {title: 'Incorrect Password'})
      }
    }
  })
});




module.exports = router;



// router.post('/home/addlocation', function(req,res,next) {
//   // let stream = fs.createReadStream("routes/LocationData.csv")
//   const csvFilePath = 'routes/LocationData.csv'
//   csv()
//   .fromFile(csvFilePath)
//   .then((jsonObj) => {
//     for (let location in jsonObj) {
//       for (let key in jsonObj[location]) {
//         // console.log('location hello')
//         // console.log(location)
//         if (key === "Key") {
//           // console.log('hello')
//           delete jsonObj[location][key]
//         }
//         let newKey = key.split(' ').join('_').toLowerCase()
//         delete Object.assign(jsonObj[location], {[newKey] : jsonObj[location][key]})[key];
//         // if(newKey==='phone') {
//         //   jsonObj[location][newKey] = parseFloat(jsonObj[location][newKey].replace(/[^0-9]/, ''));
//         // }
//         // if(newKey === 'latitude' || newKey === 'longitude' || newKey==='zip' || newKey==='phone')
//         // jsonObj[location][newKey] = parseFloat(jsonObj[location][newKey].replace(/[^0-9.]/, ''));
//       }
//     }
//     // console.log(jsonObj)
//     jsonObj
//     .forEach((location) => {
//       console.log(location)
//       let newLocation = new Location(location);
//       console.log(newLocation)
//       newLocation.save(function(err, res2) {
//         if (err) console.error(err);
//         console.log(res2)
//       })
//     })
//     res.send(jsonObj);
//   })
//
//   // stream.pipe(csvStream);
//
// });
