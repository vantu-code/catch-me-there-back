const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const User = require('../models/User');
const Event = require('../models/Event');

//get all users
router.get('/', (req,res, next)=>{
User.find()
.then((result) => {
    console.log("resulty", result)
    res,json(result)
}).catch((err) => {
    console.log(err)
});
})


//edit joined to event
  router.put('/:userId', (req,res, next)=>{
    const {organizing, attending} = req.params
    User.put(organizing, attending)
    .then((result) => {
        res.json(result)
    }).catch((err) => {
        console.log(err)
    });
    Event.create({
    })

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