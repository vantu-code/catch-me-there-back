const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const User = require('../models/User');
const Event = require('../models/Event');

// to /events



// router.get('/hello', (req, res, next) => {
// console.log("hey", req.session.currentUser);
// res.status(200).json({message: "Hallo"})
//   });

// https://app.ticketmaster.com/discovery/v2/events.json?city=barcelona&apikey=Y4MH0iVp8WoFqZ4aSc3RFUk6DjJl4K1y
router.get('/', (req, res, next) => {
    Event.find()
    .then((result) => {
        res.status(200).json(result)
        return result
    }).catch((err) => {
    });
  });

  router.post('/', (req,res, next)=>{
    Event.create(req.body)
    .then((result) => {
        res.json(result)
    }).catch((err) => {
        console.log(err)
    });
    Event.create({
    })

})

//delete event
 router.delete('/delete/:eventId', (req, res, next)=>{
     console.log("delete")
    const {eventId} = req.params
    Event.findByIdAndRemove(eventId)
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err)
    });
})
//5df25c1d060c8119194dec6c


//// add coming
router.put('/:eventId', (req, res, next)=>{
        const {eventId}= req.params;
        const {_id} = req.session.currentUser;


        // var conditions = {
        //     _id: eventId,
        //     comingIds: { $nin: [ _id ] } 
        // };
        
        // var update = { $push: { comingIds: _id },  $inc : { coming : 1 }  }
        
        // Event.findByIdAndUpdate(conditions, update, { new: true } )
        Event.findByIdAndUpdate(eventId, { $addToSet: { comingIds: _id },  $inc : { coming : 1 }  }, { new: true })
        .then((updatedEvent) => {
            res.status(200).json(updatedEvent);
        }).catch((err) => {
            res.status(400).json({message: "you are already coming"})
        });
})
router.put(`/leave/:eventId`,(req, res, next)=>{
    const {eventId}= req.params;
    const {_id} = req.session.currentUser;
    Event.findByIdAndUpdate(eventId, { $pull: { comingIds: _id },  $inc : { coming : -1 }  }, { new: true })
    .then((updatedEvent) => {
        res.status(200).json(updatedEvent);
    }).catch((err) => {
        res.status(400).json({message: err})
    });
})

        router.get('/:eventId', (req, res, next)=>{
            //console.log("eventDetail here", req.params.eventId)
            Event.findById(req.params.eventId)
            .then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                
            });
            
        })

module.exports = router;