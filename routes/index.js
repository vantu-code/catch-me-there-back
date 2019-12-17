const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const User = require('../models/User');
const Event = require('../models/Event');

// to /events


router.get('/', (req, res, next) => {
    Event.find()
    .then((result) => {
        res.status(200).json(result)
        return result
    }).catch((err) => {
    });
  });

  //delete event
  router.delete('/delete/:eventId', (req, res, next)=>{
      //console.log("delete")
      const {_id} = req.session.currentUser;
      const {eventId} = req.params
      Event.findByIdAndRemove(eventId)
      .then((result) => {
          User.findByIdAndUpdate(_id, { $pull: {organizing: result._id } }, {new: true})
          .then((updated) => {
              console.log("updated")
              res.status(200).json(result)
          })
        }).catch((err) => {
            console.log(err)
        });
    })
    
    //// add coming
    router.put('/:eventId', (req, res, next)=>{
        const {eventId}= req.params;
        const {_id} = req.session.currentUser;
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
            console.log(err)
        });
    })
    
    router.post('/', (req,res, next)=>{
      const {_id} = req.session.currentUser
      Event.create(req.body)
      .then((result) => {
          res.json(result)
          //console.log("after creating", result)
      User.findByIdAndUpdate(_id, {$addToSet:{organizing: result._id}}, { new: true })
      .then((updatedUser) => {
          // console.log("continueeeeeee", updatedUser)
      })
      }).catch((err) => {
          console.log(err)
      });
  })



    module.exports = router;