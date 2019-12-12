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

router.get('/:artistName', (req, res) => {
console.log(" in back-end")
spotifyApi
.searchArtists(req.params.artistName)
.then(data => {
    console.log("The received data from the API: ", data.body.artists.items[0].name, data.body.artists.items[0].id)
    const artistId = data.body.artists.items[0].id
    spotifyApi.getArtistTopTracks(artistId, 'GB')
    .then(function(data) {

        //this.albumFunction(artistId)
        res.json(data)
    }, function(err) {
    console.log('Something went wrong!', err);
  });
})
.catch(err => {
    console.log("The error while searching artists occurred: ", err);
});
})


/////////////////////////////////////////
albumFunction=(artistId)=>{
    spotifyApi.getArtistAlbums(artistId)
    .then(function(data) {        
        spotifyApi.getAlbumTracks(data.body.items[0].id)
        .then(function(data) {
        console.log(data.body.items)
        }, function(err) {
        console.log('Something went wrong!', err);
        });
    console.log("yap yap", data.body.items[0].id)
    })
    .catch(err => {
    console.log("The error while searching artists occurred: ", err);
    });
}


router.get("/tracks/:albumId", (req, res) => {
    spotifyApi.getAlbumTracks(req.params.albumId)
    .then(function(data) {
    res.render('tracks', {tracks: data.body.items})
    }, function(err) {
    console.log('Something went wrong!', err);
    });
});
////////////////////////////////////////////


module.exports = router;