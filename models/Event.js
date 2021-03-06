const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    whatsAppGroup: String, // required 
    title: String, // required 
    description: String, // required 
    vibe: String,
    maxPeople: Number,
    coming: Number, 
    comingIds: [],
    organizerId: String,
    location: String, 
    date: String, // required 
    hour: String, // required 
    ageRange: String, 
    photo: String, // (link) 
    themeSong: String, // (link) 
    concertId: String,
    relatedConcert: {},
    city: String,
    country: String
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
//{type: String, required: true}