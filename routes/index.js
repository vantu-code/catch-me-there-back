const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const User = require('../models/User');
const Event = require('../models/Event');


// router.get('/hello', (req, res, next) => {
// console.log("hey", req.session.currentUser);
// res.status(200).json({message: "Hallo"})
//   });

// https://app.ticketmaster.com/discovery/v2/events.json?city=barcelona&apikey=Y4MH0iVp8WoFqZ4aSc3RFUk6DjJl4K1y
router.get('/events', (req, res, next) => {
    Event.find()
    .then((result) => {
        res.status(200).json(result)
        return result
    }).catch((err) => {
        
    });
  });

module.exports = router;