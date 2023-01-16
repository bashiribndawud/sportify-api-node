const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();
// Initialize the Spotify Web API
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

// Get an access token
spotifyApi
  .clientCredentialsGrant()
  .then((data) => {
    spotifyApi.setAccessToken(data.body["access_token"]);
  })
  .catch((error) => {
    console.log("Error getting token", error);
  });

const allSongs = (req, res) => {
  spotifyApi
    .getNewReleases({ limit: 5, offset: 0, country: "NG" })
    .then((data) => {
      res.send(data.body);
    })
    .catch((error) => {
      console.log("Error getting artist", error);
    });
};

const getOneSong = (req, res) => {
  const { id } = req.params;
  spotifyApi
    .getAlbum(id)
    .then((data) => {
      res.send(data.body);
    })
    .catch((error) => {
      console.log("Error getting album", error);
    });
};

const SearchAlbum = (req, res) => {
  const { term } = req.query;
  spotifyApi
    .searchTracks(term)
    .then((data) => {
       return res.send(data.body)
    })
    .catch((error) => {
      console.log("Error getting Search", error);
    });
};

module.exports = { allSongs, getOneSong, SearchAlbum };
