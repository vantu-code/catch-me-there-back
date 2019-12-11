const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    whatsAppGroup: String, // required 
    title: String, // required 
    description: String, // required 
    vibe: String,
    maxPeople: Number,
    coming: Number, 
    location: String, 
    date: String, // required 
    hour: String, // required 
    ageRange: String, 
    photo: String, // (link) 
    themeSong: String, // (link) 
    concertId: String,
    city: String,
    country: String
// }, {
//   timestamps: {
//     createdAt: 'created_at',
//     updatedAt: 'updated_at'
//   },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
//{type: String, required: true}