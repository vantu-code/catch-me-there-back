const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/mongoose-movies-development');

const User = require('../models/User');
const Event = require('../models/Event');

const users = [
  {username : "Sean", password : "123"},
  {username : "Ruben", password : "123"},
  {username : "Rita", password : "123"}
]

const events = [
    {
        whatsAppGroup: 'https://www.facebook.com',
        title: "roof-top party", // required 
        description: "let's hang at my roof-top", // required 
        vibe: "chill",
        maxPeople: 20,
        coming: 5, 
        location: "Gotico", 
        date: "22.1.20", // required 
        hour: "19:30", // required 
        photo: "https://pm1.narvii.com/5855/25f572ca9d85f326bd9d1e6fc053c49b9d03ce0c_hq.jpg", // (link) 
        city: "Barcelona",
        country: "Spain"
    },
    {
        whatsAppGroup: 'https://www.facebook.com',
        title: "beer party", // required 
        description: "Celrbrating the creation of beer", // required 
        vibe: "Happy",
        maxPeople: 10,
        coming: 3, 
        location: "El-Born", 
        date: "30.1.20", // required 
        hour: "21:30", // required 
        photo: "https://vignette.wikia.nocookie.net/apple-black/images/8/8b/FirstPopularityPoll.png/revision/latest/scale-to-width-down/670?cb=20190202212404", // (link) 
        city: "Barcelona",
        country: "Spain"
    },
    {
        whatsAppGroup: 'https://www.facebook.com',
        title: "Weekend chill", // required 
        description: "Celrbrating the end of the week", // required 
        vibe: "Happy",
        maxPeople: 7,
        coming: 2, 
        location: "Gracia", 
        date: "25.1.20", // required 
        hour: "21:30", // required 
        photo: "https://upload.wikimedia.org/wikipedia/en/1/1e/Pokemon_adventures_characters.png", // (link) 
        city: "Barcelona",
        country: "Spain"
    },
];

//process.env.MONGODB_URI
mongoose
  .connect("mongodb://localhost:27017/catch-me-there", { useNewUrlParser: true })
  .then(() => {
    return Event.create(events);
  })
  .then((insertedEvents) => {
    console.log('Inserted events:', insertedEvents.length);
    return User.create(users);
  })
  .then(insertedUsers => {
    console.log('Inserted users:', insertedUsers.length);
    mongoose.connection.close();
  })
  .catch(err => console.log(err));