const express = require('express');
const router = express.Router();

const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});


spotifyApi
.clientCredentialsGrant()
.then(data => {
spotifyApi.setAccessToken(data.body["access_token"]);
})
.catch(error => {
console.log("Something went wrong when retrieving an access token", error);
});

router.get('/', (req, res) => {
spotifyApi
.searchArtists("bonobo")
.then(data => {
    console.log("The received data from the API: ", data.body.artists.items[0].name, data.body.artists.items[0].id)
    const artistId = data.body.artists.items[0].id
    spotifyApi.getArtistTopTracks(artistId, 'GB')
    .then(function(data) {
        console.log("in top", data.body);
        res.json(data)
    }, function(err) {
    console.log('Something went wrong!', err);
  });
})
.catch(err => {
    console.log("The error while searching artists occurred: ", err);
});
})



module.exports = router;