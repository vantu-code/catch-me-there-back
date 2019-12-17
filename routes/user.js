const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const User = require('../models/User');
const Event = require('../models/Event');

///////// => /user/


//get all users
router.get('/', (req,res, next)=>{
User.find()
.then((result) => {
    // console.log("resulty", result)
    res,json(result)
}).catch((err) => {
    console.log(err)
});
})


//edit joined to event
  router.put('/:eventId', (req,res, next)=>{
      const userId = req.session.currentUser._id
      const {eventId} = req.params
    //   console.log("useryio after joining:, ", req.params, " idddd", userId)
      User.findByIdAndUpdate(userId, {$addToSet:{attending: eventId}}, { new: true })
      .then((result) => {
          res.json(result)
        // console.log("user after joining:, ", result)
    }).catch((err) => {
        console.log(err)
    });
})

router.put('/leave/:eventId', (req,res, next)=>{
    const userId = req.session.currentUser._id
    const {eventId} = req.params
    User.findByIdAndUpdate(userId, {$pull:{attending: eventId}}, { new: true })
    .then((result) => {
        res.json(result)
        // console.log("user after leaving:, ", result)
    }).catch((err) => {
        console.log(err)
    });
})

//show someone's profile
router.get('/:userId', (req,res, next)=>{
    const {userId} = req.params
    User.findById(userId)
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err)
    });
})
    //show my profile
    router.get('profile/', (req,res, next)=>{
        const userId = req.session.currentUser._id
        User.findById(userId)
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            console.log(err)
        });
    })

module.exports = router;